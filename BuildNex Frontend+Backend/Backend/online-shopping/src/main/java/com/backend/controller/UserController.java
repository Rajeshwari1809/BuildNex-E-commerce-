package com.backend.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.AddUserRequest;
import com.backend.dto.UserLoginRequest;
import com.backend.model.User;
import com.backend.service.UserService;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
    private UserService userService;
	
	
	
	@PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody AddUserRequest userRequest) {
        User newUser = userService.registerUser(userRequest);
         return ResponseEntity.ok(newUser);
    }
	
	
	@DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUserById(@PathVariable int userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.ok("User with ID " + userId + " has been deleted successfully.");
    }
	
	
	@GetMapping("users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
	
	
	
	
	
	@PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest);
        return ResponseEntity.ok(user);
    }

    @GetMapping("deliveryperson/all")
    public ResponseEntity<?> getAllDeliveryPersons() {
        List<User> deliveryPersons = userService.getAllDeliveryPersons();
        return ResponseEntity.ok(deliveryPersons);
    }

}
