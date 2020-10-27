package com.dva.lacustico.repository;

import com.dva.lacustico.domain.DeliveryPlatform;

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

}
