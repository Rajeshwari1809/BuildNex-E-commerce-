package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dao.ReviewDao;
import com.backend.model.*;

@Service
public class ReviewServiceImpl implements ReviewService  {
	@Autowired
	private ReviewDao reviewDao;
	
	public void addReview(Review review) {
		this.reviewDao.save(review);
		
		
	}

	@Override
	public void deleteReview(Review review) {
		this.reviewDao.delete(review);
		
	}

	@Override
	public List<Review> getReviewsByProductId(int productId) {
	    List<Review> reviews = reviewDao.findByProduct_Id(productId);
	    return reviews;
	}


//	@Override
//	public List<Review> getReviewsByProductId(int productId) {
//	    List<Review> reviews = reviewDao.findByProductId(productId);
//	    return reviews;
//	}


}
