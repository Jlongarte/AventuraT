package com.api.tfg.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "carts", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"customer_id", "trip_id"})
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

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
}
