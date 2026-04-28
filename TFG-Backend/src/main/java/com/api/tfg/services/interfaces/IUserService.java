package com.api.tfg.services.interfaces;

import com.api.tfg.dto.in.*;
import com.api.tfg.dto.out.LoginUserOutDTO;
import com.api.tfg.models.User;

public interface IUserService {

	User registerUser(RegisterUserInDTO data);

	LoginUserOutDTO loginUser(LoginUserInDTO data);

	String deleteUser(String userId);

	String forgotPassword(ForgotPasswordInDTO data);

	String verifyResetCode(VerifyResetCodeInDTO data);

	String resetPassword(ResetPasswordInDTO data);

	LoginUserOutDTO verifyToken();

	//ESTO ES SOLO DE MOMENTO PARA PROBAR LOS JWT'S
	String saludo();
}
