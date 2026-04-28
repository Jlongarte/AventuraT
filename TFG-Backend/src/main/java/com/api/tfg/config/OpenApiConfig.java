package com.api.tfg.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
		info = @Info(
				title = "TFG Aventura Trips API",
				version = "1.0.0",
				description = "REST API for a travel/tour booking platform. "
						+ "Provides endpoints for customer registration, trip browsing, "
						+ "favorites, cart, bookings, and company management."
		)
)
@SecurityScheme(
		name = "bearerAuth",
		type = SecuritySchemeType.HTTP,
		scheme = "bearer",
		bearerFormat = "JWT",
		description = "Enter your JWT token. You can obtain it via POST /api/user/login"
)
public class OpenApiConfig {
}
