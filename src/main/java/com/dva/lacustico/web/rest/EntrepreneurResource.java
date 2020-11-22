package com.dva.lacustico.web.rest;

import com.dva.lacustico.domain.Authority;
import com.dva.lacustico.domain.Entrepreneur;
import com.dva.lacustico.domain.Product;
import com.dva.lacustico.domain.User;
import com.dva.lacustico.repository.EntrepreneurRepository;
import com.dva.lacustico.repository.ProductRepository;
import com.dva.lacustico.repository.UserRepository;
import com.dva.lacustico.security.AuthoritiesConstants;
import com.dva.lacustico.security.SecurityUtils;
import com.dva.lacustico.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.dva.lacustico.domain.Entrepreneur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntrepreneurResource {

    private final Logger log = LoggerFactory.getLogger(EntrepreneurResource.class);

    private static final String ENTITY_NAME = "entrepreneur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntrepreneurRepository entrepreneurRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public EntrepreneurResource(EntrepreneurRepository entrepreneurRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.entrepreneurRepository = entrepreneurRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /**
     * {@code POST  /entrepreneurs} : Create a new entrepreneur.
     *
     * @param entrepreneur the entrepreneur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entrepreneur, or with status {@code 400 (Bad Request)} if the entrepreneur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entrepreneurs")
    public ResponseEntity<Entrepreneur> createEntrepreneur(@Valid @RequestBody Entrepreneur entrepreneur) throws URISyntaxException {
        log.debug("REST request to save Entrepreneur : {}", entrepreneur);
        if (entrepreneur.getId() != null) {
            throw new BadRequestAlertException("A new entrepreneur cannot already have an ID", ENTITY_NAME, "idexists");
        }

        User user = userRepository.findOneByLogin(getCurrentUserLogin()).get();
        ArrayList<String> rol = new ArrayList<String>();

        for (Authority temp : user.getAuthorities()) {
            System.out.println(temp.getName());
            rol.add(temp.getName());
        }
        if(!rol.contains("ROLE_ADMIN")){
            entrepreneur.setUser(user);
            System.out.println("USER");
        }
        Entrepreneur result = entrepreneurRepository.save(entrepreneur);
        return ResponseEntity.created(new URI("/api/entrepreneurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entrepreneurs} : Updates an existing entrepreneur.
     *
     * @param entrepreneur the entrepreneur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entrepreneur,
     * or with status {@code 400 (Bad Request)} if the entrepreneur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entrepreneur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entrepreneurs")
    public ResponseEntity<Entrepreneur> updateEntrepreneur(@Valid @RequestBody Entrepreneur entrepreneur) throws URISyntaxException {
        log.debug("REST request to update Entrepreneur : {}", entrepreneur);
        if (entrepreneur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Entrepreneur existingEntre = entrepreneurRepository.findById(entrepreneur.getId()).get();

        if(existingEntre.isActivated()!= entrepreneur.isActivated()){
            log.debug("REST request to change Entrepreneur status: {}", entrepreneur);

            if(entrepreneur.isActivated()){
                productRepository.updateProductStatus(entrepreneur.getId(), true);
            }else{
                productRepository.updateProductStatus(entrepreneur.getId(), false);
            }
        }

        Entrepreneur result = entrepreneurRepository.save(entrepreneur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entrepreneur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entrepreneurs} : get all the entrepreneurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entrepreneurs in body.
     */
    @GetMapping("/entrepreneurs")
    public List<Entrepreneur> getAllEntrepreneurs() {
        List<Entrepreneur> result;
        log.debug("REST request to get all Entrepreneurs");

        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            result= entrepreneurRepository.findAll();
        }else{
            result= entrepreneurRepository.findByUserIsCurrentUser();
        }
        return result;
    }

    @GetMapping("/entrepreneurs-current")
    public List<Entrepreneur> getEntrepreneurByCurrentUser() {

        return entrepreneurRepository.findByUserIsCurrentUser();
    }

    /**
     * {@code GET  /entrepreneurs/:id} : get the "id" entrepreneur.
     *
     * @param id the id of the entrepreneur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entrepreneur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entrepreneurs/{id}")
    public ResponseEntity<Entrepreneur> getEntrepreneur(@PathVariable Long id) {
        log.debug("REST request to get Entrepreneur : {}", id);
        Optional<Entrepreneur> entrepreneur = entrepreneurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entrepreneur);
    }

    /**
     * {@code DELETE  /entrepreneurs/:id} : delete the "id" entrepreneur.
     *
     * @param id the id of the entrepreneur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entrepreneurs/{id}")
    public ResponseEntity<Void> deleteEntrepreneur(@PathVariable Long id) {
        log.debug("REST request to delete Entrepreneur : {}", id);
        entrepreneurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    public String getCurrentUserLogin() {
        org.springframework.security.core.context.SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        String login = "";
        if (authentication != null)
            if (authentication.getPrincipal() instanceof UserDetails){
                login = ((UserDetails) authentication.getPrincipal()).getUsername();
            }
            else if (authentication.getPrincipal() instanceof String)
                login = (String) authentication.getPrincipal();

        return login;
    }

    @GetMapping("/entrepreneurs/active")
    public List<Entrepreneur> getEntrepreneur() {
        log.debug("REST request to get All active Entrepreneur" );
         return entrepreneurRepository.findAllActive();
    }

    @GetMapping("/entrepreneurs/name/{name}")
    public List<Entrepreneur> getAllActiveEntrepreneurByName(@PathVariable String name) {
        log.debug("REST request to get Entrepreneur by name : {}", name);
        return entrepreneurRepository.findAllActiveByName(name);
    }

    @GetMapping("/entrepreneurs/category/{category}")
    public List<Entrepreneur> getAllActiveEntreprenurByCategory(@PathVariable String category) {
        log.debug("REST request to get Entrepreneur by category : {}", category);
        return entrepreneurRepository.findAllActiveByCategory(category);
    }

}
