package com.api.tfg.models;

import com.api.tfg.models.enums.Continent;
import com.api.tfg.models.enums.Currency;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "trips")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "guide_id", referencedColumnName = "id", nullable = false)
    private Guide guide;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "trip_description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "continent", nullable = false)
    private Continent continent;

    @Column(nullable = false, length = 64)
    private String country;

    @Column(nullable = false, length = 64)
    private String city;

    @Column(nullable = false, precision = 6, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency", nullable = false)
    private Currency currency;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal rating;

    @Column(name = "is_discount", nullable = false, columnDefinition = "boolean default false")
    private Boolean isDiscount;

    @Column(name = "discount_percentage", nullable = false)
    private Integer discountPercentage;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;
}
