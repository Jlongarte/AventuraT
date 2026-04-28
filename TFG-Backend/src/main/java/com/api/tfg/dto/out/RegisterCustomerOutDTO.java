package com.api.tfg.dto.out;

import com.api.tfg.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCustomerOutDTO {

	private String id;

	private	String email;

	private Role role;

	private String firstName;

	private String lastName;

	private String phone;
}
