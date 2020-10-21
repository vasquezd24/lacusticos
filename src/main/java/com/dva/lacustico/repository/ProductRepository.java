package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Product;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Modifying
    @Transactional
    @Query("update Product p set p.activated = :status where p.entrepreneur.id = :id")
    void updateProductStatus(@Param("id") Long id, @Param("status") Boolean status);
}
