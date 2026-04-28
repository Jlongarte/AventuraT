package com.api.tfg.services.interfaces;

import com.api.tfg.dto.in.CreateGuideInDTO;
import com.api.tfg.dto.in.CreateTripInDTO;
import com.api.tfg.dto.in.RegisterCompanyInDTO;
import com.api.tfg.dto.out.CreateGuideOutDTO;
import com.api.tfg.dto.out.CreateTripOutDTO;
import com.api.tfg.dto.out.RegisterCompanyOutDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICompanyService {

	RegisterCompanyOutDTO registerCompany(RegisterCompanyInDTO data);

	CreateGuideOutDTO createGuide(CreateGuideInDTO data, MultipartFile file);

	CreateTripOutDTO createTrip(CreateTripInDTO data, List<MultipartFile> images);

	String deleteGuide(String guideId);

	String deleteTrip(String tripId);
}
