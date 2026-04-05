package com.api.tfg.dto.in;

import com.api.tfg.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserInDTO {

	private String email;

	private String password;

	private Role role;
}