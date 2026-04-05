package com.api.tfg.controllers;

import com.api.tfg.dto.in.CreateGuideInDTO;
import com.api.tfg.dto.in.CreateTripInDTO;
import com.api.tfg.dto.in.RegisterCompanyInDTO;
import com.api.tfg.dto.out.CreateGuideOutDTO;
import com.api.tfg.dto.out.CreateTripOutDTO;
import com.api.tfg.dto.out.RegisterCompanyOutDTO;
import com.api.tfg.response.ApiResponse;
import com.api.tfg.services.classes.CompanyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
	private final CompanyService companyService;

	public CompanyController(CompanyService companyService) {
		this.companyService = companyService;
	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<RegisterCompanyOutDTO>> register(@Valid @RequestBody RegisterCompanyInDTO companyIn){

		RegisterCompanyOutDTO companyOut = companyService.registerCompany(companyIn);

		ApiResponse<RegisterCompanyOutDTO> response = new ApiResponse<>(
				"Created",
				"Company registered successfully",
				companyOut
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PostMapping("/createGuide")
	public ResponseEntity<ApiResponse<CreateGuideOutDTO>> createGuide(
			@Valid @RequestPart("data") CreateGuideInDTO createGuideIn,
			@RequestPart("image") MultipartFile file
	){

		CreateGuideOutDTO createGuideOut = companyService.createGuide(createGuideIn, file);

		ApiResponse<CreateGuideOutDTO> response = new ApiResponse<>(
				"Created",
				"Guide created successfully",
				createGuideOut
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PostMapping("/createTrip")
	public ResponseEntity<ApiResponse<CreateTripOutDTO>> createTrip(
			@Valid @RequestPart("data") CreateTripInDTO createTripIn,
			@RequestPart("images") List<MultipartFile> files
	){

		CreateTripOutDTO createTripOut = companyService.createTrip(createTripIn, files);

		ApiResponse<CreateTripOutDTO> response = new ApiResponse<>(
				"Created",
				"Trip created successfully",
				createTripOut
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@DeleteMapping("/deleteGuide/{guideId}")
	public ResponseEntity<ApiResponse<String>> deleteGuide(@PathVariable String guideId){

		String deletedGuide = companyService.deleteGuide(guideId);

		ApiResponse<String> response = new ApiResponse<>(
				"Success",
				"Guide with id: " + deletedGuide + " was deleted successfully",
				"Guide deleted successfully"
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@DeleteMapping("/deleteTrip/{tripId}")
	public ResponseEntity<ApiResponse<String>> deleteTrip(@PathVariable String tripId){

		String deletedTrip = companyService.deleteTrip(tripId);

		ApiResponse<String> response = new ApiResponse<>(
				"Success",
				"Trip with id: " + deletedTrip + " was deleted successfully",
				"Trip deleted successfully"
		);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
