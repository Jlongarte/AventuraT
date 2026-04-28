package com.api.tfg.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCardOutDTO {

	private String id;

	private String place;

	private String title;

	private String price;

	private BigDecimal rating;

	private String imageUrl;

	private Boolean isDiscount;

	private Integer discountPercentage;

	private String startDate;

	private String endDate;
}
