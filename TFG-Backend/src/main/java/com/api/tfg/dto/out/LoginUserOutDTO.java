package com.api.tfg.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginUserOutDTO {

	private String token;

	private String id;

	private String name;

	private String email;

	private String role;

	private String imageUrl;
}
