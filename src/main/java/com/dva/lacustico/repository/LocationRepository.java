package com.dva.lacustico.repository;

import com.dva.lacustico.domain.Location;

import com.dva.lacustico.domain.Product;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Location entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query("select l from Location l where  l.entrepreneur.id = :id")
    List<Location> findLocationByEntrepreneur (@Param("id") Long id);

    @Query("select l from Location l where  l.entrepreneur.id = :id and l.activated=true")
    List<Location> findLocationByEntrepreneurActive (@Param("id") Long id);

    @Query("SELECT  l from Location l join Entrepreneur e on l.entrepreneur.id= e.id join User u on e.user.id = u.id where u.login=?#{principal.username}")
    List<Location> findByUserIsCurrentUser();

}
