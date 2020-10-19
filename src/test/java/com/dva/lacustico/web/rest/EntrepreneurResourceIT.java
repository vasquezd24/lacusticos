package com.dva.lacustico.web.rest;

import com.dva.lacustico.LacusticoApp;
import com.dva.lacustico.domain.Entrepreneur;
import com.dva.lacustico.repository.EntrepreneurRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EntrepreneurResource} REST controller.
 */
@SpringBootTest(classes = LacusticoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EntrepreneurResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHONE_NUMBER = 1;
    private static final Integer UPDATED_PHONE_NUMBER = 2;

    private static final String DEFAULT_SCHEDULE = "AAAAAAAAAA";
    private static final String UPDATED_SCHEDULE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_WEB_SITE = "AAAAAAAAAA";
    private static final String UPDATED_WEB_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_FACEBOOK_PAGE = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK_PAGE = "BBBBBBBBBB";

    private static final String DEFAULT_INSTAGRAM_PAGE = "AAAAAAAAAA";
    private static final String UPDATED_INSTAGRAM_PAGE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVATED = false;
    private static final Boolean UPDATED_ACTIVATED = true;

    @Autowired
    private EntrepreneurRepository entrepreneurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntrepreneurMockMvc;

    private Entrepreneur entrepreneur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entrepreneur createEntity(EntityManager em) {
        Entrepreneur entrepreneur = new Entrepreneur()
            .email(DEFAULT_EMAIL)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .schedule(DEFAULT_SCHEDULE)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE)
            .webSite(DEFAULT_WEB_SITE)
            .facebookPage(DEFAULT_FACEBOOK_PAGE)
            .instagramPage(DEFAULT_INSTAGRAM_PAGE)
            .activated(DEFAULT_ACTIVATED);
        return entrepreneur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entrepreneur createUpdatedEntity(EntityManager em) {
        Entrepreneur entrepreneur = new Entrepreneur()
            .email(UPDATED_EMAIL)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .schedule(UPDATED_SCHEDULE)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .webSite(UPDATED_WEB_SITE)
            .facebookPage(UPDATED_FACEBOOK_PAGE)
            .instagramPage(UPDATED_INSTAGRAM_PAGE)
            .activated(UPDATED_ACTIVATED);
        return entrepreneur;
    }

    @BeforeEach
    public void initTest() {
        entrepreneur = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntrepreneur() throws Exception {
        int databaseSizeBeforeCreate = entrepreneurRepository.findAll().size();
        // Create the Entrepreneur
        restEntrepreneurMockMvc.perform(post("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entrepreneur)))
            .andExpect(status().isCreated());

        // Validate the Entrepreneur in the database
        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeCreate + 1);
        Entrepreneur testEntrepreneur = entrepreneurList.get(entrepreneurList.size() - 1);
        assertThat(testEntrepreneur.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEntrepreneur.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEntrepreneur.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEntrepreneur.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testEntrepreneur.getSchedule()).isEqualTo(DEFAULT_SCHEDULE);
        assertThat(testEntrepreneur.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testEntrepreneur.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);
        assertThat(testEntrepreneur.getWebSite()).isEqualTo(DEFAULT_WEB_SITE);
        assertThat(testEntrepreneur.getFacebookPage()).isEqualTo(DEFAULT_FACEBOOK_PAGE);
        assertThat(testEntrepreneur.getInstagramPage()).isEqualTo(DEFAULT_INSTAGRAM_PAGE);
        assertThat(testEntrepreneur.isActivated()).isEqualTo(DEFAULT_ACTIVATED);
    }

    @Test
    @Transactional
    public void createEntrepreneurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entrepreneurRepository.findAll().size();

        // Create the Entrepreneur with an existing ID
        entrepreneur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntrepreneurMockMvc.perform(post("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entrepreneur)))
            .andExpect(status().isBadRequest());

        // Validate the Entrepreneur in the database
        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepreneurRepository.findAll().size();
        // set the field null
        entrepreneur.setEmail(null);

        // Create the Entrepreneur, which fails.


        restEntrepreneurMockMvc.perform(post("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entrepreneur)))
            .andExpect(status().isBadRequest());

        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepreneurRepository.findAll().size();
        // set the field null
        entrepreneur.setName(null);

        // Create the Entrepreneur, which fails.


        restEntrepreneurMockMvc.perform(post("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entrepreneur)))
            .andExpect(status().isBadRequest());

        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepreneurRepository.findAll().size();
        // set the field null
        entrepreneur.setDescription(null);

        // Create the Entrepreneur, which fails.


        restEntrepreneurMockMvc.perform(post("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entrepreneur)))
            .andExpect(status().isBadRequest());

        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActivatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepreneurRepository.findAll().size();
        // set the field null
        entrepreneur.setActivated(null);

        // Create the Entrepreneur, which fails.


        restEntrepreneurMockMvc.perform(post("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entrepreneur)))
            .andExpect(status().isBadRequest());

        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEntrepreneurs() throws Exception {
        // Initialize the database
        entrepreneurRepository.saveAndFlush(entrepreneur);

        // Get all the entrepreneurList
        restEntrepreneurMockMvc.perform(get("/api/entrepreneurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entrepreneur.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].schedule").value(hasItem(DEFAULT_SCHEDULE)))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))))
            .andExpect(jsonPath("$.[*].webSite").value(hasItem(DEFAULT_WEB_SITE)))
            .andExpect(jsonPath("$.[*].facebookPage").value(hasItem(DEFAULT_FACEBOOK_PAGE)))
            .andExpect(jsonPath("$.[*].instagramPage").value(hasItem(DEFAULT_INSTAGRAM_PAGE)))
            .andExpect(jsonPath("$.[*].activated").value(hasItem(DEFAULT_ACTIVATED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEntrepreneur() throws Exception {
        // Initialize the database
        entrepreneurRepository.saveAndFlush(entrepreneur);

        // Get the entrepreneur
        restEntrepreneurMockMvc.perform(get("/api/entrepreneurs/{id}", entrepreneur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entrepreneur.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.schedule").value(DEFAULT_SCHEDULE))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)))
            .andExpect(jsonPath("$.webSite").value(DEFAULT_WEB_SITE))
            .andExpect(jsonPath("$.facebookPage").value(DEFAULT_FACEBOOK_PAGE))
            .andExpect(jsonPath("$.instagramPage").value(DEFAULT_INSTAGRAM_PAGE))
            .andExpect(jsonPath("$.activated").value(DEFAULT_ACTIVATED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingEntrepreneur() throws Exception {
        // Get the entrepreneur
        restEntrepreneurMockMvc.perform(get("/api/entrepreneurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntrepreneur() throws Exception {
        // Initialize the database
        entrepreneurRepository.saveAndFlush(entrepreneur);

        int databaseSizeBeforeUpdate = entrepreneurRepository.findAll().size();

        // Update the entrepreneur
        Entrepreneur updatedEntrepreneur = entrepreneurRepository.findById(entrepreneur.getId()).get();
        // Disconnect from session so that the updates on updatedEntrepreneur are not directly saved in db
        em.detach(updatedEntrepreneur);
        updatedEntrepreneur
            .email(UPDATED_EMAIL)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .schedule(UPDATED_SCHEDULE)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .webSite(UPDATED_WEB_SITE)
            .facebookPage(UPDATED_FACEBOOK_PAGE)
            .instagramPage(UPDATED_INSTAGRAM_PAGE)
            .activated(UPDATED_ACTIVATED);

        restEntrepreneurMockMvc.perform(put("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntrepreneur)))
            .andExpect(status().isOk());

        // Validate the Entrepreneur in the database
        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeUpdate);
        Entrepreneur testEntrepreneur = entrepreneurList.get(entrepreneurList.size() - 1);
        assertThat(testEntrepreneur.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEntrepreneur.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntrepreneur.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEntrepreneur.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testEntrepreneur.getSchedule()).isEqualTo(UPDATED_SCHEDULE);
        assertThat(testEntrepreneur.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testEntrepreneur.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
        assertThat(testEntrepreneur.getWebSite()).isEqualTo(UPDATED_WEB_SITE);
        assertThat(testEntrepreneur.getFacebookPage()).isEqualTo(UPDATED_FACEBOOK_PAGE);
        assertThat(testEntrepreneur.getInstagramPage()).isEqualTo(UPDATED_INSTAGRAM_PAGE);
        assertThat(testEntrepreneur.isActivated()).isEqualTo(UPDATED_ACTIVATED);
    }

    @Test
    @Transactional
    public void updateNonExistingEntrepreneur() throws Exception {
        int databaseSizeBeforeUpdate = entrepreneurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntrepreneurMockMvc.perform(put("/api/entrepreneurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entrepreneur)))
            .andExpect(status().isBadRequest());

        // Validate the Entrepreneur in the database
        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntrepreneur() throws Exception {
        // Initialize the database
        entrepreneurRepository.saveAndFlush(entrepreneur);

        int databaseSizeBeforeDelete = entrepreneurRepository.findAll().size();

        // Delete the entrepreneur
        restEntrepreneurMockMvc.perform(delete("/api/entrepreneurs/{id}", entrepreneur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Entrepreneur> entrepreneurList = entrepreneurRepository.findAll();
        assertThat(entrepreneurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
