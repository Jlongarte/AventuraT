package com.api.tfg.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trip_id", referencedColumnName = "id", nullable = false)
	@JsonIgnore
	@ToString.Exclude
	private Trip trip;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
	@JsonIgnore
	@ToString.Exclude
	private Customer customer;

	@Column(name = "commentary", nullable = false, columnDefinition = "TEXT")
	private String comment;
}
