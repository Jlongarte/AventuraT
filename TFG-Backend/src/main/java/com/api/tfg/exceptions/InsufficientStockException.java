package com.api.tfg.exceptions;

import java.util.List;

public class InsufficientStockException extends RuntimeException {

	private final List<String> tripIds;

	public InsufficientStockException(String message, List<String> tripIds) {
		super(message);
		this.tripIds = tripIds;
	}

	public List<String> getTripIds() {
		return tripIds;
	}
}
