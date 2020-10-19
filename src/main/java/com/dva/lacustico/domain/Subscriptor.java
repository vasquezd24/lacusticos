package com.dva.lacustico.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany
    @JoinTable(name = "subscriptor_entrepreneur",
               joinColumns = @JoinColumn(name = "subscriptor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "entrepreneur_id", referencedColumnName = "id"))
    private Set<Entrepreneur> entrepreneurs = new HashSet<>();

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

    public Set<Entrepreneur> getEntrepreneurs() {
        return entrepreneurs;
    }

    public Subscriptor entrepreneurs(Set<Entrepreneur> entrepreneurs) {
        this.entrepreneurs = entrepreneurs;
        return this;
    }

    public Subscriptor addEntrepreneur(Entrepreneur entrepreneur) {
        this.entrepreneurs.add(entrepreneur);
        entrepreneur.getSubscriptors().add(this);
        return this;
    }

    public Subscriptor removeEntrepreneur(Entrepreneur entrepreneur) {
        this.entrepreneurs.remove(entrepreneur);
        entrepreneur.getSubscriptors().remove(this);
        return this;
    }

    public void setEntrepreneurs(Set<Entrepreneur> entrepreneurs) {
        this.entrepreneurs = entrepreneurs;
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
