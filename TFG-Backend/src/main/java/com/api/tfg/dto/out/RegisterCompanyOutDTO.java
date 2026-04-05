package com.api.tfg.dto.out;

import com.api.tfg.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCompanyOutDTO {

	private String id;

	private String email;

	private Role role;

	private String companyName;

	private String cif;

	private String address;

	private String phone;

	private String iban;
}
