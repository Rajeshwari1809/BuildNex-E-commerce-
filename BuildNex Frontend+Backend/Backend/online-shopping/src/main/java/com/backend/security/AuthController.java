package com.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.Credentials;


@CrossOrigin
@RestController
public class AuthController {
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtils;

	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody Credentials cred) {
		System.out.println("Authenticating: " + cred);
		try {
			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getEmail(), cred.getPassword());
			System.out.println("BEFORE: " + auth);
			auth = authManager.authenticate(auth);
			System.out.println("AFTER: " + auth);
			User user = (User)auth.getPrincipal();
			String token = jwtUtils.generateToken(user.getUsername());
			return ResponseEntity.ok(token);
		}catch (BadCredentialsException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
