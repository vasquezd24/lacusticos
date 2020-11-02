package com.dva.lacustico.web.rest;

import com.dva.lacustico.domain.DeliveryPlatform;
import com.dva.lacustico.domain.Product;
import com.dva.lacustico.repository.DeliveryPlatformRepository;
import com.dva.lacustico.security.AuthoritiesConstants;
import com.dva.lacustico.security.SecurityUtils;
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
 * REST controller for managing {@link com.dva.lacustico.domain.DeliveryPlatform}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DeliveryPlatformResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryPlatformResource.class);

    private static final String ENTITY_NAME = "deliveryPlatform";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryPlatformRepository deliveryPlatformRepository;

    public DeliveryPlatformResource(DeliveryPlatformRepository deliveryPlatformRepository) {
        this.deliveryPlatformRepository = deliveryPlatformRepository;
    }

    /**
     * {@code POST  /delivery-platforms} : Create a new deliveryPlatform.
     *
     * @param deliveryPlatform the deliveryPlatform to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliveryPlatform, or with status {@code 400 (Bad Request)} if the deliveryPlatform has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/delivery-platforms")
    public ResponseEntity<DeliveryPlatform> createDeliveryPlatform(@Valid @RequestBody DeliveryPlatform deliveryPlatform) throws URISyntaxException {
        log.debug("REST request to save DeliveryPlatform : {}", deliveryPlatform);
        if (deliveryPlatform.getId() != null) {
            throw new BadRequestAlertException("A new deliveryPlatform cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryPlatform result = deliveryPlatformRepository.save(deliveryPlatform);
        return ResponseEntity.created(new URI("/api/delivery-platforms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /delivery-platforms} : Updates an existing deliveryPlatform.
     *
     * @param deliveryPlatform the deliveryPlatform to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryPlatform,
     * or with status {@code 400 (Bad Request)} if the deliveryPlatform is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliveryPlatform couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/delivery-platforms")
    public ResponseEntity<DeliveryPlatform> updateDeliveryPlatform(@Valid @RequestBody DeliveryPlatform deliveryPlatform) throws URISyntaxException {
        log.debug("REST request to update DeliveryPlatform : {}", deliveryPlatform);
        if (deliveryPlatform.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DeliveryPlatform result = deliveryPlatformRepository.save(deliveryPlatform);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryPlatform.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /delivery-platforms} : get all the deliveryPlatforms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveryPlatforms in body.
     */
    @GetMapping("/delivery-platforms")
    public List<DeliveryPlatform> getAllDeliveryPlatforms() {
        log.debug("REST request to get all DeliveryPlatforms");
        List<DeliveryPlatform> result;
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            result = deliveryPlatformRepository.findAll();
        }else{
            result = deliveryPlatformRepository.findByUserIsCurrentUser();
        }
        return result;
    }

    /**
     * {@code GET  /delivery-platforms/:id} : get the "id" deliveryPlatform.
     *
     * @param id the id of the deliveryPlatform to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliveryPlatform, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/delivery-platforms/{id}")
    public ResponseEntity<DeliveryPlatform> getDeliveryPlatform(@PathVariable Long id) {
        log.debug("REST request to get DeliveryPlatform : {}", id);
        Optional<DeliveryPlatform> deliveryPlatform = deliveryPlatformRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deliveryPlatform);
    }

    /**
     * {@code DELETE  /delivery-platforms/:id} : delete the "id" deliveryPlatform.
     *
     * @param id the id of the deliveryPlatform to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/delivery-platforms/{id}")
    public ResponseEntity<Void> deleteDeliveryPlatform(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryPlatform : {}", id);
        deliveryPlatformRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }


    @GetMapping("/delivery-platforms/entrepreneur/{id}")
    public List<DeliveryPlatform> getDeliveryPlatformByEntrepreneur(@PathVariable Long id) {
        log.debug("REST request to get DeliveryPlatformByEntrepreneur : {}", id);
       // Optional<DeliveryPlatform> deliveryPlatform = deliveryPlatformRepository.findDeliveryPlatformByEntrepreneur(id);
        return deliveryPlatformRepository.findDeliveryPlatformByEntrepreneur(id);
    }
}
