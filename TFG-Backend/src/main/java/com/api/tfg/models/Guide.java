package com.api.tfg.models;

import com.api.tfg.models.enums.StyleTrip;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="guides")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Guide {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
	private Company	company;

	@Column(name = "first_name", nullable = false, length = 32)
	private String firstName;

	@Column(name = "last_name", nullable = false, length = 64)
	private String lastName;

	@Column(name = "email", nullable = false, length = 320)
	private String email;

	@Column(name = "guide_description", nullable = false, columnDefinition = "TEXT")
	private String description;

	@Column(name = "birth_date", nullable = false)
	private LocalDate birthDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "style_trip", nullable = false)
	private StyleTrip styleTrip;

	@Column(name = "image_url", nullable = false, length = 255)
	private String imageUrl;
}
