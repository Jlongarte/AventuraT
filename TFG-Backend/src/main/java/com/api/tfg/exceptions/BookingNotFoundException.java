package com.api.tfg.exceptions;

public class BookingNotFoundException extends RuntimeException {

	public BookingNotFoundException(String message) {
		super(message);
	}
}