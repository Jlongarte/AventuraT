package com.api.tfg.controllers;

import com.api.tfg.dto.in.ContactInDTO;
import com.api.tfg.dto.out.FullProductCardOutDTO;
import com.api.tfg.dto.out.GuideOutDTO;
import com.api.tfg.dto.out.ProductCardOutDTO;
import com.api.tfg.response.ApiResponse;
import com.api.tfg.services.classes.GeneralService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/general")
public class GeneralController {

	private final GeneralService generalService;

	public GeneralController(GeneralService generalService) {
		this.generalService = generalService;
	}

	@GetMapping("/getRandomTrips/{numberOfCards}")
	public ResponseEntity<ApiResponse<List<ProductCardOutDTO>>> getRandomTrips(@PathVariable int numberOfCards) {

		List<ProductCardOutDTO> cards = generalService.getRandomTrips(numberOfCards);

		ApiResponse<List<ProductCardOutDTO>> response = new ApiResponse<>(
				"Success",
				"The random trips have been successfully obtained",
				cards
		);

		return  ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getRandomImages/{numberOfImages}")
	public ResponseEntity<ApiResponse<List<String>>> getRandomImages(@PathVariable int numberOfImages) {

		List<String> images = generalService.getRandomImages(numberOfImages);

		ApiResponse<List<String>> response = new ApiResponse<>(
				"Success",
				"The random images have been successfully obtained",
				images
		);

		return  ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getGuides")
	public ResponseEntity<ApiResponse<List<GuideOutDTO>>> getGuides() {

		List<GuideOutDTO> guides = generalService.getAllGuides();

		ApiResponse<List<GuideOutDTO>> response = new ApiResponse<>(
				"Success",
				"Guides retrieved successfully",
				guides
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getTrips/{page}")
	public ResponseEntity<ApiResponse<List<ProductCardOutDTO>>> getTrips(
			@PathVariable int page,
			@RequestParam(required = false) String email) {

		List<ProductCardOutDTO> trips = generalService.getTrips(page, email);

		ApiResponse<List<ProductCardOutDTO>> response = new ApiResponse<>(
				"Success",
				"Trips retrieved successfully",
				trips
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getDiscountTrips")
	public ResponseEntity<ApiResponse<List<ProductCardOutDTO>>> getDiscountTrips(
			@RequestParam(required = false) String email) {

		List<ProductCardOutDTO> trips = generalService.getDiscountTrips(email);

		ApiResponse<List<ProductCardOutDTO>> response = new ApiResponse<>(
				"Success",
				"Discount trips retrieved successfully",
				trips
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getTrip/{tripId}")
	public ResponseEntity<ApiResponse<FullProductCardOutDTO>> getTrip(@PathVariable String tripId) {

		FullProductCardOutDTO trip = generalService.getTrip(tripId);

		ApiResponse<FullProductCardOutDTO> response = new ApiResponse<>(
				"Success",
				"Trip retrieved successfully",
				trip
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PostMapping("/contact")
	public ResponseEntity<ApiResponse<String>> contact(@Valid @RequestBody ContactInDTO contactIn) {

		String message = generalService.sendContactEmail(contactIn);

		ApiResponse<String> response = new ApiResponse<>(
				"Success",
				"Contact email sent successfully",
				message
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
