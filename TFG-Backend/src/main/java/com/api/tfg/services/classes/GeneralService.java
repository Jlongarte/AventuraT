package com.api.tfg.services.classes;

import com.api.tfg.dto.in.ContactInDTO;
import com.api.tfg.dto.out.FullProductCardOutDTO;
import com.api.tfg.dto.out.GuideOutDTO;
import com.api.tfg.dto.out.ProductCardOutDTO;
import com.api.tfg.exceptions.LimitApiException;
import com.api.tfg.exceptions.TripNotFoundException;
import com.api.tfg.exceptions.UserNotFoundException;
import com.api.tfg.models.Image;
import com.api.tfg.models.Customer;
import com.api.tfg.models.Guide;
import com.api.tfg.models.Trip;
import com.api.tfg.models.User;
import com.api.tfg.repositories.IGuideRepository;
import com.api.tfg.repositories.IImageRepository;
import com.api.tfg.repositories.ITripRepository;
import com.api.tfg.repositories.IUserRepository;
import com.api.tfg.services.interfaces.IGeneralService;
import com.resend.core.exception.ResendException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static com.api.tfg.utils.GeneralUtils.parsePrice;

@Service
public class GeneralService implements IGeneralService {

	private static final int PAGE_SIZE = 9;

	private final ITripRepository tripRepository;
	private final IImageRepository imageRepository;
	private final IGuideRepository guideRepository;
	private final IUserRepository userRepository;
	private final ResendService resendService;

	@Value("${contact.email}")
	private String contactEmail;

	public GeneralService(ITripRepository tripRepository, IImageRepository imageRepository,
						  IGuideRepository guideRepository, IUserRepository userRepository,
						  ResendService resendService) {
		this.tripRepository = tripRepository;
		this.imageRepository = imageRepository;
		this.guideRepository = guideRepository;
		this.userRepository = userRepository;
		this.resendService = resendService;
	}

	@Override
	@Transactional(readOnly = true)
	public List<ProductCardOutDTO> getRandomTrips(int numberOfCards) {

		if (numberOfCards <= 0) {
			throw new LimitApiException("Number of Cards must be greater than 0");
		}
		if (numberOfCards > 10) {
			throw new LimitApiException("Number of Cards must be less than or equal to 10");
		}

		List<Trip> trips = tripRepository.findRandomTrips(numberOfCards);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		List<ProductCardOutDTO> cards = trips.stream().map(trip -> new ProductCardOutDTO(
				trip.getId(),
				trip.getCity() + " - " + trip.getCountry(),
				trip.getTitle(),
				parsePrice(trip.getPrice(), trip.getCurrency().name()),
				trip.getRating(),
				!trip.getImages().isEmpty() ? trip.getImages().get(0).getImageUrl() : null,
				trip.getIsDiscount(),
				trip.getDiscountPercentage(),
				trip.getStartDate().format(formatter),
				trip.getEndDate().format(formatter))
		).toList();

		return cards;
	}

	@Override
	@Transactional(readOnly = true)
	public List<String> getRandomImages(int numberOfCards) {

		if (numberOfCards <= 0) {
			throw new LimitApiException("Number of Images must be greater than 0");
		}
		if (numberOfCards > 40) {
			throw new LimitApiException("Number of Images must be less than or equal to 40");
		}

		List<String> images = imageRepository.findRandomImages(numberOfCards);

		return images;
	}

	@Override
	@Transactional(readOnly = true)
	public List<GuideOutDTO> getAllGuides() {

		List<Guide> guides = guideRepository.findAll();

		return guides.stream().map(guide -> {
			String style = guide.getStyleTrip().name();
			String formattedStyle = style.charAt(0) + style.substring(1).toLowerCase();

			return new GuideOutDTO(
					guide.getFirstName() + " " + guide.getLastName(),
					guide.getDescription(),
					Period.between(guide.getBirthDate(), LocalDate.now()).getYears(),
					formattedStyle,
					guide.getImageUrl()
			);
		}).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<ProductCardOutDTO> getTrips(int page, String email) {

		if (page <= 0) {
			throw new LimitApiException("Page must be greater than 0");
		}

		int limit = PAGE_SIZE;
		int offset = (page - 1) * PAGE_SIZE;

		List<Trip> trips;

		if (email != null) {
			User user = userRepository.findByEmail(email);
			if (user == null || user.getCustomer() == null) {
				throw new UserNotFoundException("Customer not found for email: " + email);
			}
			Customer customer = user.getCustomer();
			trips = tripRepository.findTripsExcludingCustomer(customer.getId(), limit, offset);
		} else {
			trips = tripRepository.findTripsPaginated(limit, offset);
		}

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		return trips.stream().map(trip -> new ProductCardOutDTO(
				trip.getId(),
				trip.getCity() + " - " + trip.getCountry(),
				trip.getTitle(),
				parsePrice(trip.getPrice(), trip.getCurrency().name()),
				trip.getRating(),
				!trip.getImages().isEmpty() ? trip.getImages().get(0).getImageUrl() : null,
				trip.getIsDiscount(),
				trip.getDiscountPercentage(),
				trip.getStartDate().format(formatter),
				trip.getEndDate().format(formatter)
		)).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<ProductCardOutDTO> getDiscountTrips(String email) {

		List<Trip> trips;

		if (email != null) {
			User user = userRepository.findByEmail(email);
			if (user == null || user.getCustomer() == null) {
				throw new UserNotFoundException("Customer not found for email: " + email);
			}
			Customer customer = user.getCustomer();
			trips = tripRepository.findDiscountTripsExcludingCustomer(customer.getId());
		} else {
			trips = tripRepository.findDiscountTrips();
		}

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		return trips.stream().map(trip -> new ProductCardOutDTO(
				trip.getId(),
				trip.getCity() + " - " + trip.getCountry(),
				trip.getTitle(),
				parsePrice(trip.getPrice(), trip.getCurrency().name()),
				trip.getRating(),
				!trip.getImages().isEmpty() ? trip.getImages().get(0).getImageUrl() : null,
				trip.getIsDiscount(),
				trip.getDiscountPercentage(),
				trip.getStartDate().format(formatter),
				trip.getEndDate().format(formatter)
		)).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public FullProductCardOutDTO getTrip(String tripId) {

		Trip trip = tripRepository.findById(tripId)
				.orElseThrow(() -> new TripNotFoundException(tripId));

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		int watching = ThreadLocalRandom.current().nextInt(20, 101);
		int sold = ThreadLocalRandom.current().nextInt(20, 101);

		List<String> imageUrls = trip.getImages().stream()
				.map(Image::getImageUrl)
				.toList();

		return new FullProductCardOutDTO(
				trip.getId(),
				trip.getTitle(),
				trip.getDescription(),
				trip.getCity() + " - " + trip.getCountry(),
				parsePrice(trip.getPrice(), trip.getCurrency().name()),
				trip.getRating(),
				trip.getStock(),
				trip.getStartDate().format(formatter),
				trip.getEndDate().format(formatter),
				trip.getIsDiscount(),
				trip.getDiscountPercentage(),
				watching,
				sold,
				imageUrls
		);
	}

	@Override
	public String sendContactEmail(ContactInDTO contactIn) {

		StringBuilder emailBody = new StringBuilder();
		emailBody.append("<h2>New Contact Request</h2>");
		emailBody.append("<hr>");
		emailBody.append("<p><strong>Name:</strong> ").append(contactIn.getFirstName()).append(" ").append(contactIn.getLastName()).append("</p>");
		emailBody.append("<p><strong>Email:</strong> ").append(contactIn.getEmail()).append("</p>");
		emailBody.append("<p><strong>Phone:</strong> ").append(contactIn.getPhone()).append("</p>");
		emailBody.append("<hr>");
		emailBody.append("<p><strong>Message:</strong></p>");
		emailBody.append("<p>").append(contactIn.getMessage()).append("</p>");

		try {
			resendService.sendEmail(contactEmail, "Contact from " + contactIn.getFirstName() + " " + contactIn.getLastName(), emailBody.toString());
		} catch (ResendException e) {
			throw new RuntimeException(e);
		}

		return "Your message has been sent successfully";
	}
}
