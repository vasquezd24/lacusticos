package com.dva.lacustico.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Subscriptor.
 */
@Entity
@Table(name = "subscriptor")
public class Subscriptor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "activated", nullable = false)
    private Boolean activated;

    @ManyToOne
    @JsonIgnoreProperties(value = "subscriptors", allowSetters = true)
    private Entrepreneur entrepreneur;

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

    public Subscriptor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isActivated() {
        return activated;
    }

    public Subscriptor activated(Boolean activated) {
        this.activated = activated;
        return this;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public Entrepreneur getEntrepreneur() {
        return entrepreneur;
    }

    public Subscriptor entrepreneur(Entrepreneur entrepreneur) {
        this.entrepreneur = entrepreneur;
        return this;
    }

    public void setEntrepreneur(Entrepreneur entrepreneur) {
        this.entrepreneur = entrepreneur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subscriptor)) {
            return false;
        }
        return id != null && id.equals(((Subscriptor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subscriptor{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", activated='" + isActivated() + "'" +
            "}";
    }
}
