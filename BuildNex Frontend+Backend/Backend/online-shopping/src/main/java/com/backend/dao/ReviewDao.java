package com.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Review;

@Repository
public interface ReviewDao extends JpaRepository<Review, Long> {
    Review save(Review review);

	Optional<Review> findByProductId(int productId);

	List<Review> findByProduct_Id(int productId);
}
