package com.api.tfg.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTripOutDTO {

	private String id;

	private String title;

	private String description;

	private String country;

	private String city;

	private BigDecimal price;

	private String currency;

	private Integer stock;

	private LocalDate startDate;

	private LocalDate endDate;

	private String guideEmail;

	private List<String> imagesUrl;
}
