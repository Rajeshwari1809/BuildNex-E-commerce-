package com.backend.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CategoryDao;
import com.backend.dao.ProductDao;
import com.backend.dto.ProductAddRequest;
import com.backend.model.Category;
import com.backend.model.Product;
import com.backend.service.ProductService;
import com.backend.utility.StorageService;

@RestController
@RequestMapping("api/product")
@CrossOrigin         //(origins = "http://localhost:3000")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private StorageService storageService;
	
	
	@PostMapping("add")
	public ResponseEntity<?> addProduct(ProductAddRequest productDto) {
		System.out.println("recieved request for ADD PRODUCT");
		System.out.println(productDto);
		Product product=ProductAddRequest.toEntity(productDto);
		
		Optional<Category> optional = categoryDao.findById(productDto.getCategoryId());
		Category category = null;
		if(optional.isPresent()) {
			category = optional.get();
		}
		
		product.setCategory(category);
		productService.addProduct(product, productDto.getImage());
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(product);
		
	}
	@PutMapping("/update/{productId}")
	public ResponseEntity<?> updateProductById(@PathVariable int productId, @RequestBody ProductAddRequest updatedProductDto) {
	    System.out.println("Received request for updating product with ID: " + productId);
	    
	    Optional<Product> optionalProduct = productDao.findById(productId);
	    if (optionalProduct.isPresent()) {
	        Product product = optionalProduct.get();
	        
	        product.setTitle(updatedProductDto.getTitle());
	        product.setDescription(updatedProductDto.getDescription());
	        product.setPrice(updatedProductDto.getPrice());
	        product.setQuantity(updatedProductDto.getQuantity());
	        
	        Optional<Category> optionalCategory = categoryDao.findById(updatedProductDto.getCategoryId());
	        if (optionalCategory.isPresent()) {
	            Category category = optionalCategory.get();
	            product.setCategory(category);
	        }
	        
	        productService.updateProduct(product, updatedProductDto.getImage());
	        System.out.println("Product with ID " + productId + " has been updated successfully.");
	        return ResponseEntity.ok(product);
	    } else {
	        System.out.println("Product with ID " + productId + " does not exist.");
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with ID " + productId + " does not exist.");
	    }
	}

	
	@GetMapping("all")
	public ResponseEntity<?> getAllProducts() {
		
		System.out.println("request came for getting all products");
		
		List<Product> products = new ArrayList<Product>();
		
		products = productDao.findAll();
		
		System.out.println("response sent!!!");
		
		return ResponseEntity.ok(products);
		
	}
	
	@GetMapping("id")
	public ResponseEntity<?> getProductById(@RequestParam("productId") int productId) {
		
		System.out.println("request came for getting Product by Product Id");
		
		Product product = new Product();
		
		Optional<Product> optional = productDao.findById(productId);
		
		if(optional.isPresent()) {
			product = optional.get();
		}
		System.out.println("response sent!!!");
		
		return ResponseEntity.ok(product);
		
	}
	
	@GetMapping("/category")
	public ResponseEntity<?> getProductsByCategories(@RequestParam("categoryId") int categoryId) {
		
		System.out.println("request came for getting all products by category");
		
		List<Product> products = new ArrayList<Product>();
		
		products = productDao.findByCategoryId(categoryId);
		
		System.out.println("response sent!!!");
		
		return ResponseEntity.ok(products);
		
	}
	
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<?> deleteProductById(@PathVariable int productId) {
	    System.out.println("Received request for deleting product with ID: " + productId);
	    
	    Optional<Product> optionalProduct = productDao.findById(productId);
	    if (optionalProduct.isPresent()) {
	        Product product = optionalProduct.get();
	        productService.deleteProduct(product);
	        System.out.println("Product with ID " + productId + " has been deleted successfully.");
	        return ResponseEntity.ok("Product with ID " + productId + " has been deleted successfully.");
	    } else {
	        System.out.println("Product with ID " + productId + " does not exist.");
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with ID " + productId + " does not exist.");
	    }
	}


	
	@GetMapping(value="/{productImageName}", produces = "image/*")
	public void fetchProductImage(@PathVariable("productImageName") String productImageName, HttpServletResponse resp) {
		System.out.println("request came for fetching product pic");
		System.out.println("Loading file: " + productImageName);
		Resource resource = storageService.load(productImageName);
		if(resource != null) {
			try(InputStream in = resource.getInputStream()) {
				ServletOutputStream out = resp.getOutputStream();
				FileCopyUtils.copy(in, out);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		System.out.println("response sent!");
	}

}
