package com.dva.lacustico.web.rest;

import com.dva.lacustico.domain.Subscriptor;
import com.dva.lacustico.repository.SubscriptorRepository;
import com.dva.lacustico.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.dva.lacustico.domain.Subscriptor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubscriptorResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptorResource.class);

    private static final String ENTITY_NAME = "subscriptor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscriptorRepository subscriptorRepository;

    public SubscriptorResource(SubscriptorRepository subscriptorRepository) {
        this.subscriptorRepository = subscriptorRepository;
    }

    /**
     * {@code POST  /subscriptors} : Create a new subscriptor.
     *
     * @param subscriptor the subscriptor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscriptor, or with status {@code 400 (Bad Request)} if the subscriptor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscriptors")
    public ResponseEntity<Subscriptor> createSubscriptor(@Valid @RequestBody Subscriptor subscriptor) throws URISyntaxException {
        log.debug("REST request to save Subscriptor : {}", subscriptor);
        if (subscriptor.getId() != null) {
            throw new BadRequestAlertException("A new subscriptor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subscriptor result = subscriptorRepository.save(subscriptor);
        return ResponseEntity.created(new URI("/api/subscriptors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subscriptors} : Updates an existing subscriptor.
     *
     * @param subscriptor the subscriptor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriptor,
     * or with status {@code 400 (Bad Request)} if the subscriptor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscriptor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscriptors")
    public ResponseEntity<Subscriptor> updateSubscriptor(@Valid @RequestBody Subscriptor subscriptor) throws URISyntaxException {
        log.debug("REST request to update Subscriptor : {}", subscriptor);
        if (subscriptor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Subscriptor result = subscriptorRepository.save(subscriptor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscriptor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subscriptors} : get all the subscriptors.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscriptors in body.
     */
    @GetMapping("/subscriptors")
    public List<Subscriptor> getAllSubscriptors(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Subscriptors");
        return subscriptorRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /subscriptors/:id} : get the "id" subscriptor.
     *
     * @param id the id of the subscriptor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscriptor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscriptors/{id}")
    public ResponseEntity<Subscriptor> getSubscriptor(@PathVariable Long id) {
        log.debug("REST request to get Subscriptor : {}", id);
        Optional<Subscriptor> subscriptor = subscriptorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(subscriptor);
    }

    /**
     * {@code DELETE  /subscriptors/:id} : delete the "id" subscriptor.
     *
     * @param id the id of the subscriptor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscriptors/{id}")
    public ResponseEntity<Void> deleteSubscriptor(@PathVariable Long id) {
        log.debug("REST request to delete Subscriptor : {}", id);
        subscriptorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
