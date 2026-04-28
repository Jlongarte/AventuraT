package com.api.tfg.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuideOutDTO {

	private String fullName;

	private String description;

	private int age;

	private String styleTrip;

	private String imageUrl;
}
