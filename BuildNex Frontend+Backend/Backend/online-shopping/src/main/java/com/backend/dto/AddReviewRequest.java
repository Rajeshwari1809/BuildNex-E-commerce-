package com.backend.dto;

import org.springframework.beans.BeanUtils;

import com.backend.model.Review;


public class AddReviewRequest {
	private int id;

	private String comment;
	private int product_id;
	private int user_id;
	private double rating;
	
	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}

	@Override
	public String toString() {
		return "AddReviewRequest [id=" + id + ", comment=" + comment + ", product_id=" + product_id + ", user_id="
				+ user_id + ", rating=" + rating + "]";
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public static Review toEntity(AddReviewRequest dto) {
		Review entity = new Review();
		BeanUtils.copyProperties(dto, entity, "user_id", "product_id");
		return entity;

	}
}



