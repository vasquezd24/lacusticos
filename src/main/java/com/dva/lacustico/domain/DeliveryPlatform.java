package com.dva.lacustico.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A DeliveryPlatform.
 */
@Entity
@Table(name = "delivery_platform")
public class DeliveryPlatform implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties(value = "deliveryPlatforms", allowSetters = true)
    private Entrepreneur entrepreneur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DeliveryPlatform name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Entrepreneur getEntrepreneur() {
        return entrepreneur;
    }

    public DeliveryPlatform entrepreneur(Entrepreneur entrepreneur) {
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
        if (!(o instanceof DeliveryPlatform)) {
            return false;
        }
        return id != null && id.equals(((DeliveryPlatform) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DeliveryPlatform{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
