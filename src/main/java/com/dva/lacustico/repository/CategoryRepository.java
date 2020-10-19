package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Category;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Category entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.type = 'Producto' AND c.activated = true")
    List<Category> findByTypeProd ();

    @Query("SELECT c FROM Category c WHERE c.type = 'Emprendimiento' AND c.activated = true")
    List<Category> findByTypeEnt ();

}
