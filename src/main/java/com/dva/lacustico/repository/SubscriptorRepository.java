package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Subscriptor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Subscriptor entity.
 */
@Repository
public interface SubscriptorRepository extends JpaRepository<Subscriptor, Long> {

    @Query(value = "select distinct subscriptor from Subscriptor subscriptor left join fetch subscriptor.entrepreneurs",
        countQuery = "select count(distinct subscriptor) from Subscriptor subscriptor")
    Page<Subscriptor> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct subscriptor from Subscriptor subscriptor left join fetch subscriptor.entrepreneurs")
    List<Subscriptor> findAllWithEagerRelationships();

    @Query("select subscriptor from Subscriptor subscriptor left join fetch subscriptor.entrepreneurs where subscriptor.id =:id")
    Optional<Subscriptor> findOneWithEagerRelationships(@Param("id") Long id);
}
