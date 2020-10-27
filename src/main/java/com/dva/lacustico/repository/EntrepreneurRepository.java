package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Entrepreneur;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Spring Data  repository for the Entrepreneur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntrepreneurRepository extends JpaRepository<Entrepreneur, Long> {


    @Query("select e from Entrepreneur e where e.user.id = :id")
    List<Entrepreneur> findEntrepreneurByUser(@Param("id")Long id);

    @Modifying
    @Transactional
    @Query("update Entrepreneur e set e.activated = :status where e.user.id = :id")
    void updateEntrepreneurStatus( @Param("id") Long id, @Param("status") Boolean status);



    @Query("select entrepreneur from Entrepreneur entrepreneur where entrepreneur.user.login = ?#{principal.username}")
    List<Entrepreneur> findByUserIsCurrentUser();


}
