package com.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.model.Category;

public interface CategoryDao extends JpaRepository<Category, Integer> {
	

}
