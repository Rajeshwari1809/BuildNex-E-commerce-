package com.backend.service;

import java.util.List;

import com.backend.model.Category;

public interface CategoryService {
	
	public List<Category> getAllCategories();
	
	public Category addCategory(Category category) ;
	
	public void deleteCategoryById(int categoryId);

}
