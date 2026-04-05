package com.api.tfg.services.classes;

import com.api.tfg.dto.in.CreateGuideInDTO;
import com.api.tfg.dto.in.CreateTripInDTO;
import com.api.tfg.dto.in.RegisterUserInDTO;
import com.api.tfg.dto.out.CreateGuideOutDTO;
import com.api.tfg.dto.out.CreateTripOutDTO;
import com.api.tfg.dto.out.RegisterCompanyOutDTO;
import com.api.tfg.exceptions.*;
import com.api.tfg.models.*;
import com.api.tfg.dto.in.RegisterCompanyInDTO;
import com.api.tfg.models.enums.Continent;
import com.api.tfg.models.enums.Role;
import com.api.tfg.repositories.*;
import com.api.tfg.services.interfaces.ICompanyService;
import com.api.tfg.services.interfaces.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import static com.api.tfg.utils.CloudinaryUtils.extractPublicImageId;
import static com.api.tfg.utils.UserUtils.authenticateUser;

@Slf4j
@Service
public class CompanyService implements ICompanyService {

	private final ICompanyRepository companyRepository;
	private final IUserRepository userRepository;
	private final ITripRepository tripRepository;
	private final IImageRepository imageRepository;
	private final IGuideRepository guideRepository;

	private final IUserService userService;

	private final CloudinaryService cloudinaryService;

	public CompanyService(ICompanyRepository companyRepository,
						  IUserRepository userRepository,
						  ITripRepository tripRepository,
						  IImageRepository imageRepository,
						  IGuideRepository guideRepository,
						  IUserService userService,
						  CloudinaryService cloudinaryService
	) {
		this.companyRepository = companyRepository;
		this.userRepository = userRepository;
		this.tripRepository = tripRepository;
		this.imageRepository = imageRepository;
		this.guideRepository = guideRepository;

		this.userService = userService;

		this.cloudinaryService = cloudinaryService;
	}

	@Override
	@Transactional
	public RegisterCompanyOutDTO registerCompany(RegisterCompanyInDTO companyIn) {
		List<String> errors = new ArrayList<>();

		if (userRepository.existsByEmail(companyIn.getEmail())) {
			errors.add("Email address already in use");
		}
		if (companyRepository.existsByCompanyName(companyIn.getCompanyName())) {
			errors.add("Company name already exists");
		}
		if (companyRepository.existsByCif(companyIn.getCif())) {
			errors.add("Cif already exists");
		}
		if (companyRepository.existsByPhone(companyIn.getPhone())) {
			errors.add("Number phone already exists");
		}
		if (companyRepository.existsByIban(companyIn.getIban())) {
			errors.add("Iban already exists");
		}

		if (!errors.isEmpty()) {
			throw new DuplicateValuesValidationException(errors);
		}

		RegisterUserInDTO newUser = new RegisterUserInDTO(companyIn.getEmail(), companyIn.getPassword(), Role.COMPANY);
		User userCreated = userService.registerUser(newUser);
		Company newCompany = new Company();

		newCompany.setUser(userCreated);
		newCompany.setCompanyName(companyIn.getCompanyName());
		newCompany.setCif(companyIn.getCif());
		newCompany.setAddress(companyIn.getAddress());
		newCompany.setPhone(companyIn.getPhone());
		newCompany.setIban(companyIn.getIban());

		Company companyCreated = companyRepository.saveAndFlush(newCompany);

		return new RegisterCompanyOutDTO(
				companyCreated.getId(),
				companyCreated.getUser().getEmail(),
				companyCreated.getUser().getRole(),
				companyCreated.getCompanyName(),
				companyCreated.getCif(),
				companyCreated.getAddress(),
				companyCreated.getPhone(),
				companyCreated.getIban()
		);

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public CreateGuideOutDTO createGuide(CreateGuideInDTO createGuideIn, MultipartFile file) {

		User user = authenticateUser();

		List<String> errors = new ArrayList<>();

		if (guideRepository.existsByEmail(createGuideIn.getEmail())) {
			errors.add("Email address already in use");
		}

		if (!errors.isEmpty()) {
			throw new DuplicateValuesValidationException(errors);
		}

		boolean hasContent = file != null && !file.isEmpty();

		if (!hasContent) {
			throw new ImageValidationException("You must upload one image");
		}

		Company company = user.getCompany();
		String url;

		try {
			String contentType = file.getContentType();

			if (contentType == null || !contentType.startsWith("image/")) {
				throw new ImageValidationException("Only image files are allowed.");
			}

			url = cloudinaryService.upload(file);
		} catch (IOException e) {
			throw new ImageUploadException("Error uploading image to cloudinary");
		}

		Guide newGuide = new Guide();
		newGuide.setCompany(company);
		newGuide.setFirstName(createGuideIn.getFirstName());
		newGuide.setLastName(createGuideIn.getLastName());
		newGuide.setEmail(createGuideIn.getEmail());
		newGuide.setDescription(createGuideIn.getDescription());
		newGuide.setBirthDate(createGuideIn.getBirthDate());
		newGuide.setStyleTrip(createGuideIn.getStyleTrip());
		newGuide.setImageUrl(url);

		Guide guideCreated = guideRepository.saveAndFlush(newGuide);

		return new CreateGuideOutDTO(
				guideCreated.getFirstName(),
				guideCreated.getLastName(),
				guideCreated.getEmail(),
				guideCreated.getDescription(),
				guideCreated.getBirthDate(),
				guideCreated.getStyleTrip().name(),
				guideCreated.getImageUrl()
		);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public CreateTripOutDTO createTrip(CreateTripInDTO createTripIn, List<MultipartFile> files) {

		User user = authenticateUser();

		boolean hasContent = files != null && !files.isEmpty() &&
				files.stream().anyMatch(f -> !f.isEmpty());

		if (!hasContent) {
			throw new ImageValidationException("You must upload at least one image");
		}
		if (files.size() > 5) {
			throw new ImageValidationException("You must upload at most 5 images");
		}

		Company company = user.getCompany();
		Guide guide = guideRepository.findByEmail(createTripIn.getGuideEmail());

		if (guide == null) {
			throw new GuideNotFoundException("Guide with email: " + createTripIn.getGuideEmail() + " not found");
		}

		Trip newTrip = new Trip();
		newTrip.setCompany(company);
		newTrip.setGuide(guide);
		newTrip.setTitle(createTripIn.getTitle());
		newTrip.setDescription(createTripIn.getDescription());
		// TODO: Solo viajes europeos. En el futuro: extender a más continentes o mantener solo Europa.
		newTrip.setContinent(Continent.Europe);
		newTrip.setCountry(createTripIn.getCountry());
		newTrip.setCity(createTripIn.getCity());
		newTrip.setPrice(createTripIn.getPrice());
		newTrip.setCurrency(createTripIn.getCurrency());
		newTrip.setStock(createTripIn.getStock());
		newTrip.setStartDate(createTripIn.getStartDate());
		newTrip.setEndDate(createTripIn.getEndDate());
		// TODO: Aquí creamos aleatoriamente el rating número entre 4.0 y 5)
		newTrip.setRating(BigDecimal.valueOf(4.0 + Math.random()).setScale(1, RoundingMode.HALF_UP));

		Trip tripCreated = tripRepository.saveAndFlush(newTrip);
		List<Image> images = new ArrayList<>();
		List<String> imageUrls = new ArrayList<>();

		try {
			for (MultipartFile file : files) {
				if (!file.isEmpty()) {
					String contentType = file.getContentType();

					if (contentType == null || !contentType.startsWith("image/")) {
						throw new ImageValidationException("Only image files are allowed.");
					}

					String url = cloudinaryService.upload(file);
					imageUrls.add(url);

					Image image = new Image();
					image.setTrip(tripCreated);
					image.setImageUrl(url);
					images.add(image);
				}
			}
		} catch (IOException e) {
			throw new ImageUploadException("Error uploading image to cloudinary");
		}

		imageRepository.saveAll(images);

		return new CreateTripOutDTO(
				tripCreated.getId(),
				tripCreated.getTitle(),
				tripCreated.getDescription(),
				tripCreated.getCountry(),
				tripCreated.getCity(),
				tripCreated.getPrice(),
				tripCreated.getCurrency().name(),
				tripCreated.getStock(),
				tripCreated.getStartDate(),
				tripCreated.getEndDate(),
				tripCreated.getGuide().getEmail(),
				imageUrls
		);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public String deleteGuide(String guideId) {

		User user = authenticateUser();

		Guide guide = guideRepository.findById(guideId).orElseThrow(() -> new GuideNotFoundException(guideId));

		if (!user.getId().equals(guide.getCompany().getUser().getId())) {
			throw new DifferentUserException("You are not " + guide.getCompany().getCompanyName() + " so you can not delete this guide");
		}

		String imageUrl = guide.getImageUrl();

		try {
			String publicImageId = extractPublicImageId(imageUrl);
			cloudinaryService.delete(publicImageId);

			log.debug("Deleted image: {}", imageUrl);
		} catch (IOException e) {
			throw new ImageDeleteException("Error deleting image from cloud provider");
		}

		guideRepository.delete(guide);

		return guideId;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public String deleteTrip(String tripId) {

		User user = authenticateUser();

		Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new TripNotFoundException(tripId));

		if (!user.getId().equals(trip.getCompany().getUser().getId())) {
			throw new DifferentUserException("You are not " + trip.getCompany().getCompanyName() + " so you can not delete this trip");
		}

		List<String> imageUrls = trip.getImages().stream().map(Image::getImageUrl).toList();

		try {
			for (String imageUrl : imageUrls) {
				String publicImageId = extractPublicImageId(imageUrl);
				cloudinaryService.delete(publicImageId);

				log.debug("Deleted image: {}", imageUrl);
			}
		} catch (IOException e) {
			throw new ImageDeleteException("Error deleting images from cloud provider");
		}

		tripRepository.delete(trip);

		return tripId;
	}
}
