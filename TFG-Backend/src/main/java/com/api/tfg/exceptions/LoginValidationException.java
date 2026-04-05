package com.api.tfg.exceptions;

public class LoginValidationException extends RuntimeException {

	public LoginValidationException(String error) {
		super(error);
	}
}
