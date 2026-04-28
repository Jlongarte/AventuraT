package com.api.tfg.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullProductCardOutDTO {

	private String id;

	private String title;

	private String description;

	private String place;

	private String price;

	private BigDecimal rating;

	private Integer stock;

	private String startDate;

	private String endDate;

	private Boolean isDiscount;

	private Integer discountPercentage;

	private Integer watching;

	private Integer sold;

	private List<String> imageUrls;
}
