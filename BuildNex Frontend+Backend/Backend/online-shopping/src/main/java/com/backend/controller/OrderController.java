package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.MyOrderResponse;
import com.backend.dto.UpdateDeliveryStatusRequest;
import com.backend.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("api/user/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {
	
	@Autowired
	private OrderService orderService;

	private ObjectMapper objectMapper = new ObjectMapper();

	@PostMapping("order")
	public ResponseEntity<?> customerOrder(@RequestParam("userId") int userId) throws JsonProcessingException 
	{		
		ResponseEntity<?> response = orderService.customerOrder(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);

	}

	@GetMapping("myorder")
	
		public ResponseEntity<List<MyOrderResponse>> getMyOrder(@RequestParam("userId") int userId)
	{
	        return orderService.getMyOrders(userId);
	}

	@GetMapping("admin/allorder")
    public ResponseEntity<List<MyOrderResponse>> getAllOrder() {
        return orderService.getAllOrders();
    }

	
	@GetMapping("admin/showorder")
    public ResponseEntity<List<MyOrderResponse>> getOrdersByOrderId(@RequestParam("orderId") String orderId) {
        return orderService.getOrdersByOrderId(orderId);
    }
	
	
	@PostMapping("admin/order/deliveryStatus/update")
    public ResponseEntity<List<MyOrderResponse>> updateOrderDeliveryStatus(
            @RequestBody UpdateDeliveryStatusRequest deliveryRequest) throws JsonProcessingException {
        return orderService.updateOrderDeliveryStatus(deliveryRequest);
    }

	
	

	@PostMapping("admin/order/assignDelivery")
    public ResponseEntity<List<MyOrderResponse>> assignDeliveryPersonForOrder(
            @RequestBody UpdateDeliveryStatusRequest deliveryRequest) throws JsonProcessingException {
        return orderService.assignDeliveryPersonForOrder(deliveryRequest);
    }
	
	

	@GetMapping("delivery/myorder")
    public ResponseEntity<List<MyOrderResponse>> getMyDeliveryOrders(
            @RequestParam("deliveryPersonId") int deliveryPersonId)  {
        return orderService.getMyDeliveryOrders(deliveryPersonId);
    }

}
