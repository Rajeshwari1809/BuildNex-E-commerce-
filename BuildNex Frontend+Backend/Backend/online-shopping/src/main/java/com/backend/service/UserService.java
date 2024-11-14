package com.backend.service;

import java.util.List;

import com.backend.dto.AddUserRequest;
import com.backend.dto.UserLoginRequest;
import com.backend.model.User;

public interface UserService {
	
	User registerUser(AddUserRequest userRequest);

    void deleteUserById(int userId);

    User loginUser(UserLoginRequest loginRequest);

    List<User> getAllUsers();

    List<User> getAllDeliveryPersons();

}
