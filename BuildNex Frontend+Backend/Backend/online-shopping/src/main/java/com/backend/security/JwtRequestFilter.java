package com.backend.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.backend.dao.UserDao;
import com.backend.model.User;


@Component
public class JwtRequestFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserDao userDao;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// pre-processing
		String authHeader = request.getHeader("Authorization");
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
		org.springframework.security.core.userdetails.User principal = null;
		if(validHeader) {
			String token = authHeader.replace("Bearer", "").trim();
			System.out.println("Token: " + token);
			String email = jwtUtil.getTokenUsername(token);
			System.out.println("Email: " + email);
			User user = userDao.findByEmailId(email);
			if(user != null) {
				principal = user.toUser();
				System.out.println("Principal: " + principal);
				if(!jwtUtil.validateToken(token, principal.getUsername()))
					principal = null;
			}
		}
		
		if(principal != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(auth);
			// call next filter in the chain
			filterChain.doFilter(request, response);
			return;
		}
		
		if(validHeader) // token given, but not valid, then return error
			response.sendError(HttpStatus.UNAUTHORIZED.value());
		else // if no token, let authorization filter decide
			filterChain.doFilter(request, response);
		// post-processing
	}
	
}
