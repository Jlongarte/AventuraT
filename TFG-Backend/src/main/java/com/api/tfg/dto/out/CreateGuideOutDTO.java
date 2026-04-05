package com.api.tfg.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateGuideOutDTO {

	private String firstName;

	private String lastName;

	private String email;

	private String description;

	private LocalDate birthDate;

	private String styleTrip;

	private String imageUrl;
}
