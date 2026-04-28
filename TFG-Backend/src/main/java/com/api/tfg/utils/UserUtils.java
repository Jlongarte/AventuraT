package com.api.tfg.utils;

import com.api.tfg.models.User;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtils {

	public static User authenticateUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
			throw new BadCredentialsException("CREDENTIALS_MISMATCH");
		}

		return (User) authentication.getPrincipal();
	}
}
