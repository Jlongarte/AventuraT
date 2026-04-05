package com.api.tfg.security;

import com.api.tfg.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authenticationException) throws
			IOException, ServletException {

		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);

		ApiResponse<String> apiResponse = new ApiResponse<>(
				"Unauthorized",
				"Access denied: Invalid or expired token",
				authenticationException.getMessage()
		);

		ObjectMapper mapper = new ObjectMapper();
		String jsonBody = mapper.writeValueAsString(apiResponse);

		response.getWriter().write(jsonBody);
	}
}
