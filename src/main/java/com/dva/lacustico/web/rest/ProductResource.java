package com.dva.lacustico.web.rest;

import com.dva.lacustico.domain.DeliveryPlatform;
import com.dva.lacustico.domain.Entrepreneur;
import com.dva.lacustico.domain.Product;
import com.dva.lacustico.domain.Subscriptor;
import com.dva.lacustico.repository.EntrepreneurRepository;
import com.dva.lacustico.repository.ProductRepository;
import com.dva.lacustico.repository.SubscriptorRepository;
import com.dva.lacustico.security.AuthoritiesConstants;
import com.dva.lacustico.security.SecurityUtils;
import com.dva.lacustico.service.MailService;
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
 * REST controller for managing {@link com.dva.lacustico.domain.Product}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);
    private final MailService mailService;

    private static final String ENTITY_NAME = "product";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductRepository productRepository;
    private final SubscriptorRepository subscriptorRepository;
    private final EntrepreneurRepository entrepreneurRepository;


    public ProductResource(ProductRepository productRepository,MailService mailService,
                           SubscriptorRepository subscriptorRepository,
                           EntrepreneurRepository entrepreneurRepository) {
        this.productRepository = productRepository;
        this.mailService = mailService;
        this.subscriptorRepository = subscriptorRepository;
        this.entrepreneurRepository = entrepreneurRepository;
    }

    /**
     * {@code POST  /products} : Create a new product.
     *
     * @param product the product to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new product, or with status {@code 400 (Bad Request)} if the product has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to save Product : {}", product);
        if (product.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Product result = productRepository.save(product);
        List<Subscriptor> list = subscriptorRepository.findSubscriptorsByEntrepreneur(product.getEntrepreneur().getId());

        for (int i = 0; i < list.size(); i++) {
            Entrepreneur entrepreneur = entrepreneurRepository.findEntrepreneurById(list.get(i).getEntrepreneur().getId());
            mailService.sendNewProductMail(list.get(i).getEmail(), entrepreneur.getName());
        }
        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /products} : Updates an existing product.
     *
     * @param product the product to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated product,
     * or with status {@code 400 (Bad Request)} if the product is not valid,
     * or with status {@code 500 (Internal Server Error)} if the product couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/products")
    public ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to update Product : {}", product);
        if (product.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Product result = productRepository.save(product);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, product.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /products} : get all the products.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of products in body.
     */
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        log.debug("REST request to get all Products");
        List<Product> result;

        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            result = productRepository.findAll();
        }else{
            result = productRepository.findByUserIsCurrentUser();
        }
        return result;
    }

    /**
     * {@code GET  /products/:id} : get the "id" product.
     *
     * @param id the id of the product to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the product, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<Product> product = productRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(product);
    }

    /**
     * {@code DELETE  /products/:id} : delete the "id" product.
     *
     * @param id the id of the product to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        productRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }


    @GetMapping("/products/entrepreneur/{id}")
    public List<Product> getProductByEntrepreneur(@PathVariable Long id) {
        log.debug("REST request to get active Products by entrepreneur : {}", id);
        return productRepository.findProductByEntrepreneur(id);
    }

    @GetMapping("/products/entrepreneur-all/{id}")
    public List<Product> getProductByEntrepreneurAll(@PathVariable Long id) {
        log.debug("REST request to get Products by entrepreneur : {}", id);
        return productRepository.findProductByEntrepreneurAll(id);
    }

    @GetMapping("/products/entrepreneur/{id}/{name}")
    public List<Product> getProductByNameByEntre(@PathVariable Long id, @PathVariable String name) {
        log.debug("REST request to get Products by entrepreneur : {}", id);
        return productRepository.findProductByNameByEntrepreneur(id, name);
    }

    @GetMapping("/products/active")
    public List<Product> getActiveProduct() {
        log.debug("REST request to get All Active Products");
        return productRepository.findAllActive();
    }

    @GetMapping("/products/name/{name}")
    public List<Product> getAllActiveProductByName(@PathVariable String name) {
        log.debug("REST request to get Products by name : {}", name);
        return productRepository.findAllActiveByName(name);
    }

    @GetMapping("/products/category/{category}")
    public List<Product> getAllActiveProductByCategory(@PathVariable String category) {
        log.debug("REST request to get Products by category : {}", category);
        return productRepository.findAllActiveByCategory(category);
    }
}
