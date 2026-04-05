package com.api.tfg.exceptions;

import lombok.Getter;

import java.util.List;

@Getter
public class DuplicateValuesValidationException extends RuntimeException {

	private final List<String> errors;

	public DuplicateValuesValidationException(List<String> errors) {
		super("Validation failed");
		this.errors = errors;
	}
}
