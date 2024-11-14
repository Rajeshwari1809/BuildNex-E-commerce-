package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dao.AddressDao;
import com.backend.dao.UserDao;
import com.backend.dto.AddUserRequest;
import com.backend.dto.UserLoginRequest;
import com.backend.model.Address;
import com.backend.model.User;

@Service
public class UserServiceImpl implements UserService{

	 @Autowired
	    private UserDao userDao;

	    @Autowired
	    private AddressDao addressDao;

	    @Autowired
	    private PasswordEncoder encoder;
	    
	    @Autowired
		private EmailService emailService;
	
	@Override
	public User registerUser(AddUserRequest userRequest) {
        Address address = new Address();
        address.setCity(userRequest.getCity());
        address.setPincode(userRequest.getPincode());
        address.setStreet(userRequest.getStreet());

        Address addAddress = addressDao.save(address);

        User user = new User();
        user.setAddress(addAddress);
        user.setEmailId(userRequest.getEmailId());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setPhoneNo(userRequest.getPhoneNo());
        String encodedPassword = encoder.encode(userRequest.getPassword());
        user.setPassword(encodedPassword);
        user.setRole(userRequest.getRole());

      User newUser= userDao.save(user);
      
    emailService.sendEmailAsync(newUser.getEmailId(), "Registration", "Hi "+newUser.getFirstName().toUpperCase()+" "+newUser.getLastName().toUpperCase()+ " Thank you for registrating with us");
      
      return newUser;
    }

	@Override
	public void deleteUserById(int userId) {
		userDao.deleteById(userId);
		
	}

	@Override
	public User loginUser(UserLoginRequest loginRequest) {
		
		User user = userDao.findByEmailIdAndRole(loginRequest.getEmailId(), loginRequest.getRole());
		
		System.out.println(user);
		if(user==null) {
			return null;
		}
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
	        // Password doesn't match
	        return null;
	    }

	    return user;
		
		
//		return userDao.findByEmailIdAndPasswordAndRole(loginRequest.getEmailId(), 
//				loginRequest.getPassword(), loginRequest.getRole());
//	    
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userDao.findAll();
	}

	@Override
	public List<User> getAllDeliveryPersons() {
		// TODO Auto-generated method stub
		return userDao.findByRole("Delivery");
	}
	
	
		

}
