package com.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.ProductDao;
import com.backend.dao.ReviewDao;
import com.backend.dao.UserDao;
import com.backend.dto.AddReviewRequest;
import com.backend.model.*;
import com.backend.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("api/user/")            
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ReviewDao reviewDao;
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private ProductDao productDao;
	ObjectMapper objectMapper = new ObjectMapper();// used for jason coversion

	@PostMapping("addReview")
	public ResponseEntity<?> addReview(@RequestBody AddReviewRequest ReviewRequest) {
		System.out.println("recieved request for Adding review");
		System.out.println(ReviewRequest);

		Review review = AddReviewRequest.toEntity(ReviewRequest);

		Optional<User> optionalUser = userDao.findById(ReviewRequest.getUser_id());
		User user = null;
		if (optionalUser.isPresent()) {
			user = optionalUser.get();
		}
		Optional<Product> optional = productDao.findById(ReviewRequest.getProduct_id());
		Product product = null;

		if (optional.isPresent()) {
			product = optional.get();
		}

		
		review.setProduct(product);
		
		review.setUser(user);

		review.setProduct(product);
		
		reviewService.addReview(review);

		System.out.println("response sent!!!");
		
		return ResponseEntity.ok(product);

	}
	
	
	@DeleteMapping("deleteReview/{reviewId}")
	public ResponseEntity<?> deleteReview(@PathVariable("reviewId") Long reviewId) {
	    System.out.println("Received request to delete review with ID: " + reviewId);
	    
	    Optional<Review> optionalReview = reviewDao.findById(reviewId);
	    System.out.println(optionalReview );
	    if (!optionalReview.isPresent()) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    reviewService.deleteReview(optionalReview.get());
	    
	    System.out.println("Response sent!");
	    return ResponseEntity.ok().build();
	}

	
	@GetMapping("/reviews/{product_id}")
	public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable int product_id) {
	List<Review> reviews = reviewService.getReviewsByProductId(product_id);
	System.out.println(reviews);
	return ResponseEntity.ok(reviews);
	}
}
