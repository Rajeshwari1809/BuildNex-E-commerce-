package com.backend.model;

import java.util.*;

import javax.persistence.*;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(length = 20, nullable = false)
	private String firstName;
	@Column(length = 20, nullable = false)
	private String lastName;
	
	@Column(unique=true)
	private String emailId;
	
	@JsonIgnore
	private String password;
	@Column( nullable = false)
	private String phoneNo;
	
	private String role;
	
	@OneToOne
	@JoinColumn(name = "address_id")
	private Address address;
		
	public User() {
		
	}
	
	public User(int id, String firstName, String lastName, String emailId, String password, String phoneNo, String role,
			Address address) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.password = password;
		this.phoneNo = phoneNo;
		this.role = role;
		this.address = address;
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	 @OneToMany(mappedBy = "user")
	    private List<Review> reviews = new ArrayList<>();

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId=" + emailId
				+ ", password=" + password + ", phoneNo=" + phoneNo + ", address=" + address + "]";
	}

	public org.springframework.security.core.userdetails.User toUser() {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
		org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(emailId, password, 
				Collections.singletonList(authority));
		return user;
	}
	
//	@OneToOne(mappedBy = "user" ,cascade = CascadeType.ALL,orphanRemoval = true)
//	@JoinColumn(name = "cart_id")
//	private Cart cart;
}
