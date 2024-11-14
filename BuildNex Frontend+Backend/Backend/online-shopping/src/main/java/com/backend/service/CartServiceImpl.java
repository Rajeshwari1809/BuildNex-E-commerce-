package com.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dao.CartDao;
import com.backend.dao.ProductDao;
import com.backend.dao.UserDao;
import com.backend.dto.AddToCartRequest;
import com.backend.dto.CartDataResponse;
import com.backend.dto.CartResponse;
import com.backend.model.Cart;
import com.backend.model.Product;
import com.backend.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;


@Service
public class CartServiceImpl implements CartService {
	
	 @Autowired
	    private CartDao cartDao;

	    @Autowired
	    private UserDao userDao;

	    @Autowired
	    private ProductDao productDao;
	    
	    

	@Override
	public void addToCart(AddToCartRequest addToCartRequest) {
		
		Optional<User> optionalUser = userDao.findById(addToCartRequest.getUserId());
		User user = null;
		if (optionalUser.isPresent()) {
			user = optionalUser.get();
		}

		Optional<Product> optionalProduct = productDao.findById(addToCartRequest.getProductId());
		Product product = null;
		if (optionalProduct.isPresent()) {
			product = optionalProduct.get();
		}

		Cart cart = new Cart();
		cart.setProduct(product);
		cart.setQuantity(addToCartRequest.getQuantity());
		cart.setUser(user);

		cartDao.save(cart);


	}

	@Override
	public CartResponse getMyCart(int userId) throws JsonProcessingException {
		
		List<CartDataResponse> cartDatas = new ArrayList<>();

		List<Cart> userCarts = cartDao.findByUser_id(userId);

		double totalCartPrice = 0;

		for (Cart cart : userCarts) {
			CartDataResponse cartData = new CartDataResponse();
			cartData.setCartId(cart.getId());
			cartData.setProductDescription(cart.getProduct().getDescription());
			cartData.setProductName(cart.getProduct().getTitle());
			cartData.setProductImage(cart.getProduct().getImageName());
			cartData.setQuantity(cart.getQuantity());
			cartData.setProductId(cart.getProduct().getId());

			cartDatas.add(cartData);

			double productPrice = Double.parseDouble(cart.getProduct().getPrice().toString());
			// BigDecimal to a String and then to a double
			// second approach double productPrice =
			// cart.getProduct().getPrice().doubleValue();
			totalCartPrice = totalCartPrice + (cart.getQuantity() * productPrice);

		}

		CartResponse cartResponse = new CartResponse();
		cartResponse.setTotalCartPrice(String.valueOf(totalCartPrice));
		// good practice to send data in string or big d
		// Instead of double
		cartResponse.setCartData(cartDatas);
		
		return cartResponse;
	}

	@Override
	public void removeCartItem(int cartId) {

		Optional<Cart> optionalCart = this.cartDao.findById(cartId);
		Cart cart = new Cart();

		if (optionalCart.isPresent()) {
			cart = optionalCart.get();
		}

		this.cartDao.delete(cart);

	}

}
