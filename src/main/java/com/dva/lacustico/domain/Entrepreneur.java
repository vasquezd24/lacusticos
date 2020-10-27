package com.dva.lacustico.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Entrepreneur.
 */
@Entity
@Table(name = "entrepreneur")
public class Entrepreneur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "phone_number")
    private Integer phoneNumber;

    @Column(name = "schedule")
    private String schedule;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "picture_content_type")
    private String pictureContentType;

    @Column(name = "web_site")
    private String webSite;

    @Column(name = "facebook_page")
    private String facebookPage;

    @Column(name = "instagram_page")
    private String instagramPage;

    @NotNull
    @Column(name = "activated", nullable = false)
    private Boolean activated;

    @ManyToOne
    @JsonIgnoreProperties(value = "entrepreneurs", allowSetters = true)
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = "entrepreneurs", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public Entrepreneur email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public Entrepreneur name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Entrepreneur description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public Entrepreneur phoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSchedule() {
        return schedule;
    }

    public Entrepreneur schedule(String schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Entrepreneur picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Entrepreneur pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public String getWebSite() {
        return webSite;
    }

    public Entrepreneur webSite(String webSite) {
        this.webSite = webSite;
        return this;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public String getFacebookPage() {
        return facebookPage;
    }

    public Entrepreneur facebookPage(String facebookPage) {
        this.facebookPage = facebookPage;
        return this;
    }

    public void setFacebookPage(String facebookPage) {
        this.facebookPage = facebookPage;
    }

    public String getInstagramPage() {
        return instagramPage;
    }

    public Entrepreneur instagramPage(String instagramPage) {
        this.instagramPage = instagramPage;
        return this;
    }

    public void setInstagramPage(String instagramPage) {
        this.instagramPage = instagramPage;
    }

    public Boolean isActivated() {
        return activated;
    }

    public Entrepreneur activated(Boolean activated) {
        this.activated = activated;
        return this;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public Category getCategory() {
        return category;
    }

    public Entrepreneur category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public Entrepreneur user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entrepreneur)) {
            return false;
        }
        return id != null && id.equals(((Entrepreneur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Entrepreneur{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", phoneNumber=" + getPhoneNumber() +
            ", schedule='" + getSchedule() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", webSite='" + getWebSite() + "'" +
            ", facebookPage='" + getFacebookPage() + "'" +
            ", instagramPage='" + getInstagramPage() + "'" +
            ", activated='" + isActivated() + "'" +
            "}";
    }
}
