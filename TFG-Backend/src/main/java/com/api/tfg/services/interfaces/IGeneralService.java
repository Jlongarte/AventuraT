package com.api.tfg.services.interfaces;

import com.api.tfg.dto.in.ContactInDTO;
import com.api.tfg.dto.out.FullProductCardOutDTO;
import com.api.tfg.dto.out.GuideOutDTO;
import com.api.tfg.dto.out.ProductCardOutDTO;

import java.util.List;

public interface IGeneralService {

	List<ProductCardOutDTO> getRandomTrips(int numberOfTrips);

	List<String> getRandomImages(int numberOfImages);

	List<GuideOutDTO> getAllGuides();

	List<ProductCardOutDTO> getTrips(int page, String email);

	List<ProductCardOutDTO> getDiscountTrips(String email);

	FullProductCardOutDTO getTrip(String tripId);

	String sendContactEmail(ContactInDTO data);
}
