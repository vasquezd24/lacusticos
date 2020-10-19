package com.dva.lacustico.repository;

import com.dva.lacustico.domain.DeliveryPlatform;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DeliveryPlatform entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryPlatformRepository extends JpaRepository<DeliveryPlatform, Long> {
}
