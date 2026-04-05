package com.api.tfg.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingOutDTO {

	private String place;

	private String title;

	private String price;

	private BigDecimal rating;

	private String imageUrl;

	private LocalDateTime purchaseDate;
}
