package com.api.tfg.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactInDTO {

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

	@NotBlank(message = "Phone is required")
	private String phone;

	@NotBlank(message = "Message is required")
	private String message;
}