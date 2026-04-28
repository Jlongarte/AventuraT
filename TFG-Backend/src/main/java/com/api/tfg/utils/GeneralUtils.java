package com.api.tfg.utils;

import java.math.BigDecimal;

public class GeneralUtils {

	public static String parsePrice(BigDecimal price, String currency) {

		String symbol = switch (currency) {
			case "EUR" -> "€";
			case "GBP" -> "£";
			case "USD" -> "$";
			case "CHF" -> "Fr";
			case "CNY" -> "¥";
			default -> "$";
		};

		return symbol + price.toPlainString();
	}
}
