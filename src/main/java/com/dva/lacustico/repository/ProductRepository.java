package com.dva.lacustico.repository;

import com.dva.lacustico.domain.DeliveryPlatform;
import com.dva.lacustico.domain.Product;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Query("select p from Product p where p.entrepreneur.id = :id and p.activated=true")
    List<Product> findProductByEntrepreneur(@Param("id") Long id);

    @Query("select p from Product p where p.entrepreneur.id = :id")
    List<Product> findProductByEntrepreneurAll(@Param("id") Long id);

    @Query("SELECT  p from Product p join Entrepreneur e on p.entrepreneur.id= e.id join User u on e.user.id = u.id where u.login=?#{principal.username}")
    List<Product> findByUserIsCurrentUser();

    @Query ("SELECT p from Product p where p.name like %:name% and  p.entrepreneur.id = :id")
    List<Product> findProductByNameByEntrepreneur(@Param("id") Long id, @Param("name") String name);

    @Query ("select p from Product p where p.activated=true")
    List<Product> findAllActive();

    @Query("SELECT p FROM Product p where p.activated=true and p.name like %:name%")
    List<Product> findAllActiveByName( @Param("name") String name);

    @Query("SELECT  p from Product p join Category c on p.category.id= c.id where p.activated=true AND c.description like %:category%")
    List<Product> findAllActiveByCategory( @Param("category") String category);

}

