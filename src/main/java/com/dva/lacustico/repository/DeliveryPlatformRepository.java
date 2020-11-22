package com.dva.lacustico.repository;

import com.dva.lacustico.domain.DeliveryPlatform;

import com.dva.lacustico.domain.Product;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the DeliveryPlatform entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryPlatformRepository extends JpaRepository<DeliveryPlatform, Long> {

    @Query("select d from DeliveryPlatform d where d.entrepreneur.id = :id")
    List<DeliveryPlatform> findDeliveryPlatformByEntrepreneur(@Param("id")Long id);

    @Query("SELECT d from DeliveryPlatform d join Entrepreneur e on d.entrepreneur.id= e.id join User u on e.user.id = u.id where u.login=?#{principal.username}")
    List<DeliveryPlatform> findByUserIsCurrentUser();


}
