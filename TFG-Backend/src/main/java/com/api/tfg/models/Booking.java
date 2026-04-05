package com.api.tfg.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@ManyToOne
	@JoinColumn(name = "trip_id", referencedColumnName = "id", nullable = false)
	private Trip trip;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
	@JsonIgnore
	@ToString.Exclude
	private Customer customer;

	@Column(nullable = false, length = 320)
	private String email;

	@Column(nullable = false, length = 96)
	private String name;

	@Column(name = "birth_date", nullable = false)
	private LocalDate birthDate;

	@Column(nullable = false, length = 6)
	private String sex;

	@Column(nullable = false, length = 20)
	private String phone;

	@Column(name = "document_number", nullable = false, length = 20)
	private String documentNumber;

	@Column(nullable = false, length = 128)
	private String street;

	@Column(name = "house_number", nullable = false, length = 10)
	private String houseNumber;

	@Column(name = "post_code", nullable = false, length = 10)
	private String postCode;

	@Column(nullable = false, length = 64)
	private String country;

	@Column(name = "purchase_date", nullable = false)
	private LocalDateTime purchaseDate;

	@Column(name = "price_paid", nullable = false, precision = 6, scale = 2)
	private BigDecimal pricePaid;
}
