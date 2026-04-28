package com.api.tfg.dto.in;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutInDTO {

	@NotBlank(message = "Email is required")
	@Pattern(
			regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
			message = "Invalid email format (ej. user@domain.com)"
	)
	private String email;

	@NotBlank(message = "Name is required")
	private String name;

	@NotNull(message = "Birth Date is required")
	@Past(message = "The birth date must be in the past")
	@JsonFormat(pattern = "MM/dd/yyyy")
	private LocalDate birthDate;

	@NotBlank(message = "Sex is required")
	@Pattern(
			regexp = "^(Male|Female|Other)$",
			message = "Sex must be 'Male', 'Female' or 'Other'"
	)
	private String sex;

	@NotBlank(message = "Phone is required")
	private String phone;

	@NotBlank(message = "Document Number is required")
	private String documentNumber;

	@NotBlank(message = "Street is required")
	private String street;

	@NotBlank(message = "House Number is required")
	private String houseNumber;

	@NotBlank(message = "Post Code is required")
	private String postCode;

	@NotBlank(message = "Country is required")
	private String country;

	@NotEmpty(message = "Trip list is required")
	private List<String> tripIds;

	@JsonIgnore
	@AssertTrue(message = "You must be at least 1 year old")
	public boolean isOldEnough() {

		if (this.birthDate == null) {
			return true;
		}

		return Period.between(this.birthDate, LocalDate.now()).getYears() >= 1;
	}
}
