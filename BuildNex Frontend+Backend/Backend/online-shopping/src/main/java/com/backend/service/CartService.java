package com.backend.service;

import com.backend.dto.AddToCartRequest;
import com.backend.dto.CartResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface CartService {
	
	public void addToCart(AddToCartRequest addToCartRequest);
	
	public CartResponse getMyCart(int userId) throws JsonProcessingException;
	
	public void removeCartItem(int cartId);

}
