package com.api.tfg.exceptions;

public class DuplicateBookingException extends RuntimeException {

	public DuplicateBookingException(String message) {
		super(message);
	}
}