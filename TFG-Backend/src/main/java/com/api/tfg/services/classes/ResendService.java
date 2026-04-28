package com.api.tfg.services.classes;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResendService {

	private final Resend resend;

	@Value("${resend.domain}")
	private String domain;

	public void sendEmail(String to, String subject, String body) throws ResendException {
		CreateEmailOptions params = CreateEmailOptions.builder()
				.from(domain)
				.to(to)
				.subject(subject)
				.html(body)
				.build();

		resend.emails().send(params);
	}
}
