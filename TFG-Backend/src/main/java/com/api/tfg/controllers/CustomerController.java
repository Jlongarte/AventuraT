package com.api.tfg.controllers;

import com.api.tfg.dto.in.CheckoutInDTO;
import com.api.tfg.dto.in.RegisterCustomerInDTO;
import com.api.tfg.dto.out.BookingOutDTO;
import com.api.tfg.dto.out.CheckoutOutDTO;
import com.api.tfg.dto.out.ProductCardOutDTO;
import com.api.tfg.dto.out.RegisterCustomerOutDTO;
import com.api.tfg.response.ApiResponse;
import com.api.tfg.services.classes.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	private final CustomerService customerService;

	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<RegisterCustomerOutDTO>> register(@Valid @RequestBody RegisterCustomerInDTO customerIn) {

		RegisterCustomerOutDTO customerOut = customerService.registerCustomer(customerIn);

		ApiResponse<RegisterCustomerOutDTO> response = new ApiResponse<>(
				"Created",
				"Customer registered successfully",
				customerOut
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PostMapping("/addToFavorite/{tripId}")
	public ResponseEntity<ApiResponse<String>> addToFavorite(@PathVariable String tripId) {

		String tripTitle = customerService.addToFavorite(tripId);

		ApiResponse<String> response = new ApiResponse<>(
				"Created",
				"Trip added to favorites",
				"'" + tripTitle + "' added to favorites"
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@DeleteMapping("/removeFromFavorite/{tripId}")
	public ResponseEntity<ApiResponse<String>> removeFromFavorite(@PathVariable String tripId) {

		String tripTitle = customerService.removeFromFavorite(tripId);

		ApiResponse<String> response = new ApiResponse<>(
				"Success",
				"Trip removed from favorites",
				"'" + tripTitle + "' removed from favorites"
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getFavorites")
	public ResponseEntity<ApiResponse<List<ProductCardOutDTO>>> getFavorites() {

		List<ProductCardOutDTO> favorites = customerService.getFavorites();

		ApiResponse<List<ProductCardOutDTO>> response = new ApiResponse<>(
				"Success",
				"Favorites retrieved successfully",
				favorites
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PostMapping("/addToCart/{tripId}")
	public ResponseEntity<ApiResponse<String>> addToCart(@PathVariable String tripId) {

		String tripTitle = customerService.addToCart(tripId);

		ApiResponse<String> response = new ApiResponse<>(
				"Created",
				"Trip added to cart",
				"'" + tripTitle + "' added to cart"
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@DeleteMapping("/removeFromCart/{tripId}")
	public ResponseEntity<ApiResponse<String>> removeFromCart(@PathVariable String tripId) {

		String tripTitle = customerService.removeFromCart(tripId);

		ApiResponse<String> response = new ApiResponse<>(
				"Success",
				"Trip removed from cart",
				"'" + tripTitle + "' removed from cart"
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getCart")
	public ResponseEntity<ApiResponse<List<ProductCardOutDTO>>> getCart() {

		List<ProductCardOutDTO> cartItems = customerService.getCart();

		ApiResponse<List<ProductCardOutDTO>> response = new ApiResponse<>(
				"Success",
				"Cart retrieved successfully",
				cartItems
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PostMapping("/checkout")
	public ResponseEntity<ApiResponse<CheckoutOutDTO>> checkout(@Valid @RequestBody CheckoutInDTO checkoutIn) {

		CheckoutOutDTO checkoutOut = customerService.checkout(checkoutIn);

		ApiResponse<CheckoutOutDTO> response = new ApiResponse<>(
				"Success",
				"Purchase completed successfully",
				checkoutOut
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@DeleteMapping("/removeBooking/{bookingId}")
	public ResponseEntity<ApiResponse<String>> removeBooking(@PathVariable String bookingId) {

		String tripTitle = customerService.removeBooking(bookingId);

		ApiResponse<String> response = new ApiResponse<>(
				"Success",
				"Booking cancelled successfully",
				"'" + tripTitle + "' booking has been cancelled"
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getBookings")
	public ResponseEntity<ApiResponse<List<BookingOutDTO>>> getBookings() {

		List<BookingOutDTO> bookings = customerService.getBookings();

		ApiResponse<List<BookingOutDTO>> response = new ApiResponse<>(
				"Success",
				"Bookings retrieved successfully",
				bookings
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}