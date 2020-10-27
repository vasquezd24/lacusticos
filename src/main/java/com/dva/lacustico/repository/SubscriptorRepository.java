package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Subscriptor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Subscriptor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptorRepository extends JpaRepository<Subscriptor, Long> {
}
