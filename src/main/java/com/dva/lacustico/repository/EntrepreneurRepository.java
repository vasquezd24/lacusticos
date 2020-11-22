package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Entrepreneur;

import liquibase.pro.packaged.E;
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

    @Query("select e from Entrepreneur e where e.activated=true ")
    List<Entrepreneur> findAllActive();

    @Query("select e from Entrepreneur e where e.activated=true and e.name like %:name%")
    List<Entrepreneur> findAllActiveByName( @Param("name") String name);

    @Query("select e from Entrepreneur e join Category c on e.category.id=c.id where e.activated=true and c.description like %:category%")
    List<Entrepreneur> findAllActiveByCategory( @Param("category") String category);

    @Query("SELECT  e from Entrepreneur e where e.id= :id")
    Entrepreneur findEntrepreneurById ( @Param("id") Long id);
}
