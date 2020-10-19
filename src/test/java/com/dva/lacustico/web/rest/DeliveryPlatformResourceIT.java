package com.dva.lacustico.web.rest;

import com.dva.lacustico.LacusticoApp;
import com.dva.lacustico.domain.DeliveryPlatform;
import com.dva.lacustico.repository.DeliveryPlatformRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DeliveryPlatformResource} REST controller.
 */
@SpringBootTest(classes = LacusticoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DeliveryPlatformResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DeliveryPlatformRepository deliveryPlatformRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDeliveryPlatformMockMvc;

    private DeliveryPlatform deliveryPlatform;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryPlatform createEntity(EntityManager em) {
        DeliveryPlatform deliveryPlatform = new DeliveryPlatform()
            .name(DEFAULT_NAME);
        return deliveryPlatform;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryPlatform createUpdatedEntity(EntityManager em) {
        DeliveryPlatform deliveryPlatform = new DeliveryPlatform()
            .name(UPDATED_NAME);
        return deliveryPlatform;
    }

    @BeforeEach
    public void initTest() {
        deliveryPlatform = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryPlatform() throws Exception {
        int databaseSizeBeforeCreate = deliveryPlatformRepository.findAll().size();
        // Create the DeliveryPlatform
        restDeliveryPlatformMockMvc.perform(post("/api/delivery-platforms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryPlatform)))
            .andExpect(status().isCreated());

        // Validate the DeliveryPlatform in the database
        List<DeliveryPlatform> deliveryPlatformList = deliveryPlatformRepository.findAll();
        assertThat(deliveryPlatformList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryPlatform testDeliveryPlatform = deliveryPlatformList.get(deliveryPlatformList.size() - 1);
        assertThat(testDeliveryPlatform.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDeliveryPlatformWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryPlatformRepository.findAll().size();

        // Create the DeliveryPlatform with an existing ID
        deliveryPlatform.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryPlatformMockMvc.perform(post("/api/delivery-platforms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryPlatform)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryPlatform in the database
        List<DeliveryPlatform> deliveryPlatformList = deliveryPlatformRepository.findAll();
        assertThat(deliveryPlatformList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryPlatformRepository.findAll().size();
        // set the field null
        deliveryPlatform.setName(null);

        // Create the DeliveryPlatform, which fails.


        restDeliveryPlatformMockMvc.perform(post("/api/delivery-platforms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryPlatform)))
            .andExpect(status().isBadRequest());

        List<DeliveryPlatform> deliveryPlatformList = deliveryPlatformRepository.findAll();
        assertThat(deliveryPlatformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDeliveryPlatforms() throws Exception {
        // Initialize the database
        deliveryPlatformRepository.saveAndFlush(deliveryPlatform);

        // Get all the deliveryPlatformList
        restDeliveryPlatformMockMvc.perform(get("/api/delivery-platforms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryPlatform.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getDeliveryPlatform() throws Exception {
        // Initialize the database
        deliveryPlatformRepository.saveAndFlush(deliveryPlatform);

        // Get the deliveryPlatform
        restDeliveryPlatformMockMvc.perform(get("/api/delivery-platforms/{id}", deliveryPlatform.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryPlatform.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingDeliveryPlatform() throws Exception {
        // Get the deliveryPlatform
        restDeliveryPlatformMockMvc.perform(get("/api/delivery-platforms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryPlatform() throws Exception {
        // Initialize the database
        deliveryPlatformRepository.saveAndFlush(deliveryPlatform);

        int databaseSizeBeforeUpdate = deliveryPlatformRepository.findAll().size();

        // Update the deliveryPlatform
        DeliveryPlatform updatedDeliveryPlatform = deliveryPlatformRepository.findById(deliveryPlatform.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryPlatform are not directly saved in db
        em.detach(updatedDeliveryPlatform);
        updatedDeliveryPlatform
            .name(UPDATED_NAME);

        restDeliveryPlatformMockMvc.perform(put("/api/delivery-platforms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryPlatform)))
            .andExpect(status().isOk());

        // Validate the DeliveryPlatform in the database
        List<DeliveryPlatform> deliveryPlatformList = deliveryPlatformRepository.findAll();
        assertThat(deliveryPlatformList).hasSize(databaseSizeBeforeUpdate);
        DeliveryPlatform testDeliveryPlatform = deliveryPlatformList.get(deliveryPlatformList.size() - 1);
        assertThat(testDeliveryPlatform.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryPlatform() throws Exception {
        int databaseSizeBeforeUpdate = deliveryPlatformRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryPlatformMockMvc.perform(put("/api/delivery-platforms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryPlatform)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryPlatform in the database
        List<DeliveryPlatform> deliveryPlatformList = deliveryPlatformRepository.findAll();
        assertThat(deliveryPlatformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDeliveryPlatform() throws Exception {
        // Initialize the database
        deliveryPlatformRepository.saveAndFlush(deliveryPlatform);

        int databaseSizeBeforeDelete = deliveryPlatformRepository.findAll().size();

        // Delete the deliveryPlatform
        restDeliveryPlatformMockMvc.perform(delete("/api/delivery-platforms/{id}", deliveryPlatform.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DeliveryPlatform> deliveryPlatformList = deliveryPlatformRepository.findAll();
        assertThat(deliveryPlatformList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
