package com.api.tfg.config;

import com.api.tfg.exceptions.*;
import com.api.tfg.response.ApiResponse;
import com.resend.core.exception.ResendException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	//Excepciones del sistema que he modificado a mi gusto

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<String>> handleGlobalException(Exception e) {
		log.error("Unexpected error", e);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
				"Internal Server Error",
				"An unexpected error ocurred. Please contact support",
				e.getMessage()
			)
		);
	}

	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<ApiResponse<String>> handleNoResourceFoundException(NoResourceFoundException e) {

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
				"Not Found",
				"Error: The API path was not found",
				e.getMessage()
		));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<List<String>>> handleArgumentNotValidException(MethodArgumentNotValidException e) {
		List<String> errors = e.getBindingResult().getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
				new ApiResponse<>(
						"Bad Request",
						"Error: Invalid data structure or missing values",
						errors)
		);
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ApiResponse<String>> handleBadCredentialsException(BadCredentialsException e) {

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(
						"Unauthorized",
						"Error: Bad credentials",
						"Your credentials are incorrect"
				)
		);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ApiResponse<String>> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(
						"Bad Request",
						"Error: The JSON structure is incorrect",
						"There is some invalid data or something in the JSON structure is not written correctly"
				)
		);
	}

	@ExceptionHandler(ResendException.class)
	public ResponseEntity<ApiResponse<String>> handleResendException(ResendException e) {

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
				"Internal Server Error",
				"Error sending email, check credentials or perhaps Resend is down",
				"Something went wrong. Try again later"
		));
	}

	//Excepciones propias

	@ExceptionHandler(DuplicateValuesValidationException.class)
	public ResponseEntity<ApiResponse<List<String>>> handleDuplicateValuesValidationException(
			DuplicateValuesValidationException e) {
		ApiResponse<List<String>> response = new ApiResponse<>(
				"Bad Request",
				"Error: The data entered is already in use",
				e.getErrors()
		);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(LoginValidationException.class)
	public ResponseEntity<ApiResponse<String>> handleLoginValidationException(LoginValidationException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Bad Request",
				"Error: User data is inconsistent",
				e.getMessage()
		);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(ImageValidationException.class)
	public ResponseEntity<ApiResponse<String>> handleImageValidationException(ImageValidationException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Bad request",
				"Error: Incorrect image input parameters",
				e.getMessage()
		);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(ImageUploadException.class)
	public ResponseEntity<ApiResponse<String>> handleImageUploadException(ImageUploadException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Internal Server Error",
				"An unexpected error ocurred. Please contact support",
				e.getMessage()
		);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@ExceptionHandler(TripNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> handleTripNotFoundException(TripNotFoundException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Not Found",
				"Error: The trip with id: " + e.getMessage() + " was not found",
				"The trip does not exist"
		);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(ImageDeleteException.class)
	public ResponseEntity<ApiResponse<String>> handleImageDeleteException(ImageDeleteException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Internal Server Error",
				"An unexpected error ocurred. Please contact support",
				e.getMessage()
		);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@ExceptionHandler(DifferentUserException.class)
	public ResponseEntity<ApiResponse<String>> handleDifferentUserException(DifferentUserException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Forbidden",
				"Access denied: You are not allowed to perform this action",
				e.getMessage()
		);

		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	}

	@ExceptionHandler(LimitApiException.class)
	public ResponseEntity<ApiResponse<String>> handleLimitApiException(LimitApiException e) {
		ApiResponse<String> response = new ApiResponse<>(
			"Bad Request",
			"Error: You have exceeded the API limits",
				e.getMessage()
		);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> handleUserNotFoundException(UserNotFoundException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Not Found",
				e.getMessage(),
				"The user does not exist"
		);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(GuideNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> handleGuideNotFoundException(GuideNotFoundException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Not Found",
				e.getMessage(),
				"The guide does not exist"
		);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(InvalidResetCodeException.class)
	public ResponseEntity<ApiResponse<String>> handleInvalidResetCodeException(InvalidResetCodeException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Bad Request",
				e.getMessage(),
				"Invalid Reset Code"
		);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(ResetCodeNotVerifiedException.class)
	public ResponseEntity<ApiResponse<String>> handleResetCodeNotVerifiedException(ResetCodeNotVerifiedException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Forbidden",
				e.getMessage(),
				"Code not verified"
		);

		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	}

	@ExceptionHandler(AlreadyInFavoritesException.class)
	public ResponseEntity<ApiResponse<String>> handleAlreadyInFavoritesException(AlreadyInFavoritesException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Conflict",
				e.getMessage(),
				"This trip is already in your favorites"
		);

		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}

	@ExceptionHandler(FavoriteNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> handleFavoriteNotFoundException(FavoriteNotFoundException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Not Found",
				e.getMessage(),
				"This trip is not in your favorites"
		);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(AlreadyInCartException.class)
	public ResponseEntity<ApiResponse<String>> handleAlreadyInCartException(AlreadyInCartException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Conflict",
				e.getMessage(),
				"This trip is already in your cart"
		);

		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}

	@ExceptionHandler(CartItemNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> handleCartItemNotFoundException(CartItemNotFoundException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Not Found",
				e.getMessage(),
				"This trip is not in your cart"
		);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(EmptyCartException.class)
	public ResponseEntity<ApiResponse<String>> handleEmptyCartException(EmptyCartException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Bad Request",
				e.getMessage(),
				"Your cart is empty"
		);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(BookingNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> handleBookingNotFoundException(BookingNotFoundException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Not Found",
				e.getMessage(),
				"This trip is not in your bookings"
		);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(InsufficientStockException.class)
	public ResponseEntity<ApiResponse<List<String>>> handleInsufficientStockException(InsufficientStockException e) {
		ApiResponse<List<String>> response = new ApiResponse<>(
				"Conflict",
				e.getMessage(),
				e.getTripIds()
		);

		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}

	@ExceptionHandler(DuplicateBookingException.class)
	public ResponseEntity<ApiResponse<String>> handleDuplicateBookingException(DuplicateBookingException e) {
		ApiResponse<String> response = new ApiResponse<>(
				"Conflict",
				e.getMessage(),
				"This trip is already booked with the provided document number"
		);

		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}
}
