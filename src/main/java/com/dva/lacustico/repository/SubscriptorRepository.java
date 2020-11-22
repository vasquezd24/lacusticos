package com.dva.lacustico.repository;

import com.dva.lacustico.domain.DeliveryPlatform;
import com.dva.lacustico.domain.Subscriptor;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Subscriptor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptorRepository extends JpaRepository<Subscriptor, Long> {

    @Query("select s from Subscriptor s where s.entrepreneur.id=:id")
    List<Subscriptor> findSubscriptorsByEntrepreneur(@Param("id")Long id);

    @Query("select  s from Subscriptor  s where s.email = :email and s.entrepreneur.id = :id")
    Subscriptor findByEmailAndEntrepreneur(@Param("id") Long id, @Param("email") String email);

}
