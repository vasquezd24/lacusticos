package com.dva.lacustico.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @Lob
    @Column(name = "product_image")
    private byte[] productImage;

    @Column(name = "product_image_content_type")
    private String productImageContentType;

    @NotNull
    @Column(name = "activated", nullable = false)
    private Boolean activated;

    @OneToOne
    @JoinColumn(unique = true)
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = "products", allowSetters = true)
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

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public Product price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public byte[] getProductImage() {
        return productImage;
    }

    public Product productImage(byte[] productImage) {
        this.productImage = productImage;
        return this;
    }

    public void setProductImage(byte[] productImage) {
        this.productImage = productImage;
    }

    public String getProductImageContentType() {
        return productImageContentType;
    }

    public Product productImageContentType(String productImageContentType) {
        this.productImageContentType = productImageContentType;
        return this;
    }

    public void setProductImageContentType(String productImageContentType) {
        this.productImageContentType = productImageContentType;
    }

    public Boolean isActivated() {
        return activated;
    }

    public Product activated(Boolean activated) {
        this.activated = activated;
        return this;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public Category getCategory() {
        return category;
    }

    public Product category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Entrepreneur getEntrepreneur() {
        return entrepreneur;
    }

    public Product entrepreneur(Entrepreneur entrepreneur) {
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
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", productImage='" + getProductImage() + "'" +
            ", productImageContentType='" + getProductImageContentType() + "'" +
            ", activated='" + isActivated() + "'" +
            "}";
    }
}
