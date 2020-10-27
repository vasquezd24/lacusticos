package com.dva.lacustico.web.rest;

import com.dva.lacustico.LacusticoApp;
import com.dva.lacustico.domain.Subscriptor;
import com.dva.lacustico.repository.SubscriptorRepository;

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
 * Integration tests for the {@link SubscriptorResource} REST controller.
 */
@SpringBootTest(classes = LacusticoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubscriptorResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVATED = false;
    private static final Boolean UPDATED_ACTIVATED = true;

    @Autowired
    private SubscriptorRepository subscriptorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubscriptorMockMvc;

    private Subscriptor subscriptor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscriptor createEntity(EntityManager em) {
        Subscriptor subscriptor = new Subscriptor()
            .email(DEFAULT_EMAIL)
            .activated(DEFAULT_ACTIVATED);
        return subscriptor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscriptor createUpdatedEntity(EntityManager em) {
        Subscriptor subscriptor = new Subscriptor()
            .email(UPDATED_EMAIL)
            .activated(UPDATED_ACTIVATED);
        return subscriptor;
    }

    @BeforeEach
    public void initTest() {
        subscriptor = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptor() throws Exception {
        int databaseSizeBeforeCreate = subscriptorRepository.findAll().size();
        // Create the Subscriptor
        restSubscriptorMockMvc.perform(post("/api/subscriptors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptor)))
            .andExpect(status().isCreated());

        // Validate the Subscriptor in the database
        List<Subscriptor> subscriptorList = subscriptorRepository.findAll();
        assertThat(subscriptorList).hasSize(databaseSizeBeforeCreate + 1);
        Subscriptor testSubscriptor = subscriptorList.get(subscriptorList.size() - 1);
        assertThat(testSubscriptor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSubscriptor.isActivated()).isEqualTo(DEFAULT_ACTIVATED);
    }

    @Test
    @Transactional
    public void createSubscriptorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptorRepository.findAll().size();

        // Create the Subscriptor with an existing ID
        subscriptor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptorMockMvc.perform(post("/api/subscriptors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptor)))
            .andExpect(status().isBadRequest());

        // Validate the Subscriptor in the database
        List<Subscriptor> subscriptorList = subscriptorRepository.findAll();
        assertThat(subscriptorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptorRepository.findAll().size();
        // set the field null
        subscriptor.setEmail(null);

        // Create the Subscriptor, which fails.


        restSubscriptorMockMvc.perform(post("/api/subscriptors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptor)))
            .andExpect(status().isBadRequest());

        List<Subscriptor> subscriptorList = subscriptorRepository.findAll();
        assertThat(subscriptorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActivatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptorRepository.findAll().size();
        // set the field null
        subscriptor.setActivated(null);

        // Create the Subscriptor, which fails.


        restSubscriptorMockMvc.perform(post("/api/subscriptors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptor)))
            .andExpect(status().isBadRequest());

        List<Subscriptor> subscriptorList = subscriptorRepository.findAll();
        assertThat(subscriptorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubscriptors() throws Exception {
        // Initialize the database
        subscriptorRepository.saveAndFlush(subscriptor);

        // Get all the subscriptorList
        restSubscriptorMockMvc.perform(get("/api/subscriptors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptor.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].activated").value(hasItem(DEFAULT_ACTIVATED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSubscriptor() throws Exception {
        // Initialize the database
        subscriptorRepository.saveAndFlush(subscriptor);

        // Get the subscriptor
        restSubscriptorMockMvc.perform(get("/api/subscriptors/{id}", subscriptor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptor.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.activated").value(DEFAULT_ACTIVATED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSubscriptor() throws Exception {
        // Get the subscriptor
        restSubscriptorMockMvc.perform(get("/api/subscriptors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptor() throws Exception {
        // Initialize the database
        subscriptorRepository.saveAndFlush(subscriptor);

        int databaseSizeBeforeUpdate = subscriptorRepository.findAll().size();

        // Update the subscriptor
        Subscriptor updatedSubscriptor = subscriptorRepository.findById(subscriptor.getId()).get();
        // Disconnect from session so that the updates on updatedSubscriptor are not directly saved in db
        em.detach(updatedSubscriptor);
        updatedSubscriptor
            .email(UPDATED_EMAIL)
            .activated(UPDATED_ACTIVATED);

        restSubscriptorMockMvc.perform(put("/api/subscriptors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubscriptor)))
            .andExpect(status().isOk());

        // Validate the Subscriptor in the database
        List<Subscriptor> subscriptorList = subscriptorRepository.findAll();
        assertThat(subscriptorList).hasSize(databaseSizeBeforeUpdate);
        Subscriptor testSubscriptor = subscriptorList.get(subscriptorList.size() - 1);
        assertThat(testSubscriptor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSubscriptor.isActivated()).isEqualTo(UPDATED_ACTIVATED);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptor() throws Exception {
        int databaseSizeBeforeUpdate = subscriptorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriptorMockMvc.perform(put("/api/subscriptors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptor)))
            .andExpect(status().isBadRequest());

        // Validate the Subscriptor in the database
        List<Subscriptor> subscriptorList = subscriptorRepository.findAll();
        assertThat(subscriptorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubscriptor() throws Exception {
        // Initialize the database
        subscriptorRepository.saveAndFlush(subscriptor);

        int databaseSizeBeforeDelete = subscriptorRepository.findAll().size();

        // Delete the subscriptor
        restSubscriptorMockMvc.perform(delete("/api/subscriptors/{id}", subscriptor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subscriptor> subscriptorList = subscriptorRepository.findAll();
        assertThat(subscriptorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
