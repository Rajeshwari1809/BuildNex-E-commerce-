package com.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.Category;
import com.backend.service.CategoryService;

@RestController
@RequestMapping("api/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

	@Autowired
    private CategoryService categoryService;

	@GetMapping("all")
	public ResponseEntity<List<Category>> getAllCategories() {
		
		List<Category> categories = categoryService.getAllCategories();
		
		return new ResponseEntity<>(categories, HttpStatus.OK);
		
	}
	
	@PostMapping("add")
	public ResponseEntity add(@RequestBody Category category) {
		
		System.out.println("request came for add category");
		
		Category addedCategory = categoryService.addCategory(category);
        if (addedCategory != null) {
            return new ResponseEntity<>(addedCategory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to add category!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@DeleteMapping("delete/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable int categoryId) {
        try {
            categoryService.deleteCategoryById(categoryId);
            return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete category", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
}

