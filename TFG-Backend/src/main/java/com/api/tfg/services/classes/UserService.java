package com.api.tfg.services.classes;

import com.api.tfg.dto.in.*;
import com.api.tfg.dto.out.LoginUserOutDTO;
import com.api.tfg.exceptions.*;
import com.api.tfg.models.User;
import com.api.tfg.models.enums.Role;
import com.api.tfg.repositories.IUserRepository;
import com.api.tfg.security.JwtService;
import com.api.tfg.services.interfaces.IUserService;
import com.resend.core.exception.ResendException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static com.api.tfg.utils.CloudinaryUtils.extractPublicImageId;
import static com.api.tfg.utils.UserUtils.authenticateUser;

@Slf4j
@Service
public class UserService implements IUserService {

	private final IUserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	@Value("${profile.picture.default}")
	private String profilePictureDefault;

	private final CloudinaryService cloudinaryService;
	private final ResendService resendService;

	public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder,
					   AuthenticationManager authenticationManager, JwtService jwtService,
					   CloudinaryService cloudinaryService, ResendService resendService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;

		this.cloudinaryService = cloudinaryService;
		this.resendService = resendService;
	}

	@Override
	public User registerUser(RegisterUserInDTO userIn){
		String encodedPassword = passwordEncoder.encode(userIn.getPassword());
		User newUser = new User();

		newUser.setEmail(userIn.getEmail());
		newUser.setPassword(encodedPassword);
		newUser.setRole(userIn.getRole());
		newUser.setImageUrl(profilePictureDefault);

		return userRepository.saveAndFlush(newUser);
	}

	@Override
	public LoginUserOutDTO loginUser(LoginUserInDTO userIn) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(userIn.getEmail(), userIn.getPassword())
		);

		User user = userRepository.findByEmail(userIn.getEmail());
		String name;

		if (user.getRole() == Role.CUSTOMER && user.getCustomer() != null) {
			name = user.getCustomer().getFirstName() + " " + user.getCustomer().getLastName();
		} else if (user.getRole() == Role.COMPANY && user.getCompany() != null) {
			name = user.getCompany().getCompanyName();
		} else {
			throw new LoginValidationException("The user found in the JWT does not contain the role that corresponds to them or does not exist");
		}

		Map<String, Object> extraClaims = new HashMap<>();
		extraClaims.put("id", user.getId());
		extraClaims.put("role", user.getRole().name());

		String jwt = jwtService.generateToken(extraClaims, user);

		return new LoginUserOutDTO(jwt, user.getId(), name, user.getEmail(), user.getRole().name(), user.getImageUrl());
	}

	@Override
	public String forgotPassword(ForgotPasswordInDTO dataIn) {

		User user = userRepository.findByEmail(dataIn.getEmail());

		if (user != null) {
			String code = String.format("%06d", new SecureRandom().nextInt(1_000_000));
			String encodedCode = passwordEncoder.encode(code);

			try {
				resendService.sendEmail(user.getEmail(), "Password Reset Code", "Your code is: " + code);
			} catch (ResendException e) {
				throw new RuntimeException(e);
			}

			user.setResetCode(encodedCode);
			user.setResetCodeExpiry(LocalDateTime.now().plusMinutes(10));
			user.setResetCodeAttempts(0);

			userRepository.save(user);
		}

		return "Code has been sent to your email";
	}

	@Override
	public String verifyResetCode(VerifyResetCodeInDTO dataIn) {

		User user = userRepository.findByEmail(dataIn.getEmail());

		if (user != null) {
			if (user.getResetCodeAttempts() >= 3) {
				throw new InvalidResetCodeException("Too many attempts for reset code");
			}
			if (user.getResetCodeExpiry() == null || LocalDateTime.now().isAfter(user.getResetCodeExpiry())) {
				throw new InvalidResetCodeException("Code expired");
			}
			if (!passwordEncoder.matches(dataIn.getCode(), user.getResetCode())) {
				user.setResetCodeAttempts(user.getResetCodeAttempts() + 1);
				userRepository.save(user);
				throw new InvalidResetCodeException("Code is incorrect");
			}

			user.setResetCode(null);
			user.setResetCodeAttempts(0);
			user.setResetCodeVerify(true);

			userRepository.save(user);
		}

		return "Code verified successfully";
	}

	 @Override
	 public String resetPassword(ResetPasswordInDTO dataIn) {

		User user = userRepository.findByEmail(dataIn.getEmail());

		if (user != null) {
			if (user.getResetCodeExpiry() == null || LocalDateTime.now().isAfter(user.getResetCodeExpiry()) || user.getResetCodeVerify() == false) {
				throw new ResetCodeNotVerifiedException("Code has not been verified");
			}

			String newPassword = passwordEncoder.encode(dataIn.getNewPassword());

			user.setPassword(newPassword);
			user.setResetCodeExpiry(null);
			user.setResetCodeVerify(false);

			userRepository.save(user);
		}

		return "Password reset successfully";
	 }

	@Override
	@Transactional
	public String deleteUser(String userId) {

		User user = authenticateUser();

		if (!user.getId().equals(userId)) {
			throw new DifferentUserException("The ID provided does not match your user: " + user.getEmail());
		}

		String imageUrl = user.getImageUrl();

		try {
			if (!imageUrl.equals(profilePictureDefault)) {
				String publicImageId = extractPublicImageId(imageUrl);
				cloudinaryService.delete(publicImageId);

				log.debug("Deleted image: {}", imageUrl);
			}
		} catch (IOException e) {
			throw new ImageDeleteException("Error deleting images from cloud provider");
		}

		userRepository.delete(user);

		return userId;
	}

	//ESTO ES SOLO DE MOMENTO PARA PROBAR LOS JWT'S
	@Override
	public String saludo() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
			return "error: usuario no autenticado";
		}

		User user = (User) authentication.getPrincipal();

		return "Holaaaaaa: " + user.getEmail();
	}
}
