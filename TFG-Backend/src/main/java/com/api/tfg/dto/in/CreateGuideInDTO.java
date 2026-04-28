package com.api.tfg.dto.in;

import com.api.tfg.models.enums.Currency;
import com.api.tfg.models.enums.StyleTrip;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateGuideInDTO {

	@NotBlank(message = "First Name is required")
	private String firstName;

	@NotBlank(message = "Last Name is required")
	private String lastName;

	@NotBlank(message = "Email is required")
	@Pattern(
			regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
			message = "Invalid email format (ej. user@domain.com)"
	)
	private String email;

	@NotBlank(message = "Description is required")
	private String description;

	@NotNull(message = "Birth Date is required")
	@Past(message = "The birth date must be in the past")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate birthDate;

	@NotNull(message = "Style Trip is required")
	private StyleTrip styleTrip;

	@JsonIgnore
	@AssertTrue(message = "The guide must be at least 18 years old")
	public boolean isAdult() {

		if (this.birthDate == null) {
			return true;
		}

		return Period.between(this.birthDate, LocalDate.now()).getYears() >= 18;
	}
}
