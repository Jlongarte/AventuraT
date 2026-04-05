package com.api.tfg.controllers;

import com.api.tfg.dto.in.ForgotPasswordInDTO;
import com.api.tfg.dto.in.LoginUserInDTO;
import com.api.tfg.dto.in.ResetPasswordInDTO;
import com.api.tfg.dto.in.VerifyResetCodeInDTO;
import com.api.tfg.dto.out.LoginUserOutDTO;
import com.api.tfg.response.ApiResponse;
import com.api.tfg.services.classes.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<LoginUserOutDTO>> login(@Valid @RequestBody LoginUserInDTO userIn) {

		LoginUserOutDTO userOut = userService.loginUser(userIn);

		ApiResponse<LoginUserOutDTO> apiResponse = new ApiResponse<>(
				"Success",
				"User login successfully",
				userOut
		);

		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

	@PostMapping("/forgotPassword")
	public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordInDTO userIn) {

		String message = userService.forgotPassword(userIn);

		ApiResponse<String> apiResponse = new ApiResponse<>(
				"Success",
				"Reset code sent",
				message
		);

		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

	@PostMapping("/verifyResetCode")
	public ResponseEntity<ApiResponse<String>> verifyResetCode(@Valid @RequestBody VerifyResetCodeInDTO userIn) {

		String message = userService.verifyResetCode(userIn);

		ApiResponse<String> apiResponse = new ApiResponse<>(
				"Success",
				"Code has been verified",
				message
		);

		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

	@PostMapping("/resetPassword")
	public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordInDTO userIn) {

		String message = userService.resetPassword(userIn);

		ApiResponse<String> apiResponse = new ApiResponse<>(
				"Success",
				"Password has been reset",
				message
		);

		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

	@DeleteMapping("/deleteUser/{userId}")
	public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable String userId) {

		String deletedUser = userService.deleteUser(userId);

		ApiResponse<String> response = new ApiResponse<>(
				"Success",
				"The user with id: " + deletedUser + " was deleted successfully",
				"User deleted successfully"
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	// TODO: ESTO ES SOLO DE MOMENTO PARA PROBAR LOS JWT'S
	@GetMapping("/auth/saludo")
	public ResponseEntity<ApiResponse<String>> saludo() {

		String saludo = userService.saludo();

		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(
				"Funciona creo",
				"Cualquier cosa",
				saludo
		));
	}
}
