package com.api.tfg.dto.in;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCompanyInDTO {

	@NotBlank(message = "Email is required")
	@Pattern(
			regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
			message = "Invalid email format (ej. user@domain.com)"
	)
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must be at least 8 characters long")
	private String password;

	@NotBlank(message = "Company name is required")
	@Size(min = 8, message = "Company name must be at least 8 characters long")
	private String companyName;

	@NotBlank(message = "CIF is required")
	@Size(min = 6, message = "CIF must be at least 6 characters long")
	private String cif;

	@NotBlank(message = "Address is required")
	@Size(min = 6, message = "Address must be at least 6 characters long")
	private String address;

	@NotBlank(message = "Number phone is required")
	@Size(min = 6, message = "Number phone must be at least 6 characters long")
	private String phone;

	@NotBlank(message = "Iban is required")
	@Size(min = 14, message = "Iban must be at least 14 characters long")
	private String iban;
}
