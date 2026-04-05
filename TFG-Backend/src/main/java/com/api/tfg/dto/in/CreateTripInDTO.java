package com.api.tfg.dto.in;

import com.api.tfg.models.enums.Currency;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTripInDTO {

	@NotBlank(message = "Title is required")
	private String title;

	@NotBlank(message = "Description is required")
	private String description;

	@NotBlank(message = "Country is required")
	private String country;

	@NotBlank(message = "City is required")
	private String city;

	@NotNull(message = "Price is required")
	@Positive(message = "Price must be positive")
	private BigDecimal price;

	@NotNull(message = "Currency is required")
	private Currency currency;

	@NotNull(message = "Stock is required")
	@Min(value = 1, message = "The trip must have at least one seat")
	private Integer stock;

	@NotNull(message = "Start Date is required")
	@Future(message = "The trip must start in the future")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;

	@NotNull(message = "End Date is required")
	@Future(message = "The trip must end in the future")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;

	@NotBlank(message = "Guide Email is required")
	@Pattern(
			regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
			message = "Invalid email format (ej. user@domain.com)"
	)
	private String guideEmail;

	@JsonIgnore
	@AssertTrue(message = "The end date must be later than the start date")
	public boolean isDateRangeValid() {

		if (startDate == null || endDate == null) {
			return true;
		}

		return endDate.isAfter(startDate);
	}
}
