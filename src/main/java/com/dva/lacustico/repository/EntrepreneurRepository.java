package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Entrepreneur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Entrepreneur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntrepreneurRepository extends JpaRepository<Entrepreneur, Long> {

    @Query("select entrepreneur from Entrepreneur entrepreneur where entrepreneur.user.login = ?#{principal.username}")
    List<Entrepreneur> findByUserIsCurrentUser();
}
