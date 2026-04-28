package com.api.tfg.services.classes;

import com.api.tfg.dto.in.CheckoutInDTO;
import com.api.tfg.dto.in.RegisterCustomerInDTO;
import com.api.tfg.dto.in.RegisterUserInDTO;
import com.api.tfg.dto.out.BookingOutDTO;
import com.api.tfg.dto.out.CheckoutOutDTO;
import com.api.tfg.dto.out.ProductCardOutDTO;
import com.api.tfg.dto.out.RegisterCustomerOutDTO;
import com.api.tfg.exceptions.*;
import com.api.tfg.models.*;
import com.api.tfg.models.enums.Role;
import com.api.tfg.repositories.*;
import com.api.tfg.services.interfaces.ICustomerService;
import com.api.tfg.services.interfaces.IUserService;
import com.resend.core.exception.ResendException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.api.tfg.utils.GeneralUtils.parsePrice;
import static com.api.tfg.utils.UserUtils.authenticateUser;

@Service
public class CustomerService implements ICustomerService {

	private final ICustomerRepository customerRepository;
	private final IUserRepository userRepository;
	private final ITripRepository tripRepository;
	private final IFavoriteRepository favoriteRepository;
	private final ICartRepository cartRepository;
	private final IBookingRepository bookingRepository;

	private final IUserService userService;
	private final ResendService resendService;

	public CustomerService(ICustomerRepository customerRepository,
						   IUserRepository userRepository,
						   ITripRepository tripRepository,
						   IFavoriteRepository favoriteRepository,
						   ICartRepository cartRepository,
						   IBookingRepository bookingRepository,
						   IUserService userService,
						   ResendService resendService) {
		this.customerRepository = customerRepository;
		this.userRepository = userRepository;
		this.tripRepository = tripRepository;
		this.favoriteRepository = favoriteRepository;
		this.cartRepository = cartRepository;
		this.bookingRepository = bookingRepository;
		this.userService = userService;
		this.resendService = resendService;
	}

	@Override
	@Transactional
	public RegisterCustomerOutDTO registerCustomer(RegisterCustomerInDTO customerIn){

		List<String> errors = new ArrayList<>();

		if (userRepository.existsByEmail(customerIn.getEmail())) {
			errors.add("Email address already in use");
		}
		if (customerRepository.existsByPhone(customerIn.getPhone())) {
			errors.add("Number phone already exists");
		}

		if (!errors.isEmpty()) {
			throw new DuplicateValuesValidationException(errors);
		}

		RegisterUserInDTO newUser = new RegisterUserInDTO(customerIn.getEmail(), customerIn.getPassword(), Role.CUSTOMER);
		User userCreated = userService.registerUser(newUser);
		Customer newCustomer = new Customer();

		newCustomer.setUser(userCreated);
		newCustomer.setFirstName(customerIn.getFirstName());
		newCustomer.setLastName(customerIn.getLastName());
		newCustomer.setPhone(customerIn.getPhone());

		Customer customerCreated = customerRepository.saveAndFlush(newCustomer);

		return new RegisterCustomerOutDTO(
				customerCreated.getId(),
				customerCreated.getUser().getEmail(),
				customerCreated.getUser().getRole(),
				customerCreated.getFirstName(),
				customerCreated.getLastName(),
				customerCreated.getPhone()
		);
	}

	@Override
	@Transactional
	public String addToFavorite(String tripId) {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		Trip trip = tripRepository.findById(tripId)
				.orElseThrow(() -> new TripNotFoundException(tripId));

		if (favoriteRepository.findByCustomerAndTrip(customer, trip).isPresent()) {
			throw new AlreadyInFavoritesException("Trip '" + trip.getTitle() + "' is already in favorites");
		}

		Favorite favorite = new Favorite();
		favorite.setCustomer(customer);
		favorite.setTrip(trip);

		favoriteRepository.save(favorite);

		return trip.getTitle();
	}

	@Override
	@Transactional
	public String removeFromFavorite(String tripId) {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		Trip trip = tripRepository.findById(tripId)
				.orElseThrow(() -> new TripNotFoundException(tripId));

		Favorite favorite = favoriteRepository.findByCustomerAndTrip(customer, trip)
				.orElseThrow(() -> new FavoriteNotFoundException("Trip '" + trip.getTitle() + "' is not in favorites"));

		favoriteRepository.delete(favorite);

		return trip.getTitle();
	}

	@Override
	@Transactional(readOnly = true)
	public List<ProductCardOutDTO> getFavorites() {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		List<Favorite> favorites = favoriteRepository.findAllByCustomer(customer);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

		return favorites.stream().map(fav -> {
			Trip trip = fav.getTrip();
			return new ProductCardOutDTO(
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
			);
		}).toList();
	}

	@Override
	@Transactional
	public String addToCart(String tripId) {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		Trip trip = tripRepository.findById(tripId)
				.orElseThrow(() -> new TripNotFoundException(tripId));

		if (cartRepository.findByCustomerAndTrip(customer, trip).isPresent()) {
			throw new AlreadyInCartException("Trip '" + trip.getTitle() + "' is already in cart");
		}

		Cart cart = new Cart();
		cart.setCustomer(customer);
		cart.setTrip(trip);

		cartRepository.save(cart);

		return trip.getTitle();
	}

	@Override
	@Transactional
	public String removeFromCart(String tripId) {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		Trip trip = tripRepository.findById(tripId)
				.orElseThrow(() -> new TripNotFoundException(tripId));

		Cart cartItem = cartRepository.findByCustomerAndTrip(customer, trip)
				.orElseThrow(() -> new CartItemNotFoundException("Trip '" + trip.getTitle() + "' is not in cart"));

		cartRepository.delete(cartItem);

		return trip.getTitle();
	}

	@Override
	@Transactional(readOnly = true)
	public List<ProductCardOutDTO> getCart() {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		List<Cart> cartItems = cartRepository.findAllByCustomer(customer);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

		return cartItems.stream().map(item -> {
			Trip trip = item.getTrip();
			return new ProductCardOutDTO(
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
			);
		}).toList();
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public CheckoutOutDTO checkout(CheckoutInDTO checkoutIn) {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		List<String> tripIds = checkoutIn.getTripIds();

		List<Trip> trips = new ArrayList<>();
		for (String tripId : tripIds) {
			Trip trip = tripRepository.findByIdWithLock(tripId)
					.orElseThrow(() -> new TripNotFoundException(tripId));
			trips.add(trip);
		}

		for (Trip trip : trips) {
			if (bookingRepository.existsByDocumentNumberAndTrip(checkoutIn.getDocumentNumber(), trip)) {
				throw new DuplicateBookingException("The trip '" + trip.getTitle() + "' is already registered for document number " + checkoutIn.getDocumentNumber());
			}
		}

		List<String> outOfStockIds = trips.stream()
				.filter(trip -> trip.getStock() <= 0)
				.map(Trip::getId)
				.toList();

		if (!outOfStockIds.isEmpty()) {
			throw new InsufficientStockException("Some trips have insufficient stock", outOfStockIds);
		}

		List<Booking> bookings = new ArrayList<>();
		List<String> tripTitles = new ArrayList<>();
		BigDecimal totalPaid = BigDecimal.ZERO;

		for (Trip trip : trips) {
			trip.setStock(trip.getStock() - 1);
			tripRepository.save(trip);

			Booking booking = new Booking();
			booking.setCustomer(customer);
			booking.setTrip(trip);
			booking.setEmail(checkoutIn.getEmail());
			booking.setName(checkoutIn.getName());
			booking.setBirthDate(checkoutIn.getBirthDate());
			booking.setSex(checkoutIn.getSex());
			booking.setPhone(checkoutIn.getPhone());
			booking.setDocumentNumber(checkoutIn.getDocumentNumber());
			booking.setStreet(checkoutIn.getStreet());
			booking.setHouseNumber(checkoutIn.getHouseNumber());
			booking.setPostCode(checkoutIn.getPostCode());
			booking.setCountry(checkoutIn.getCountry());
			booking.setPurchaseDate(LocalDateTime.now());
			booking.setPricePaid(trip.getPrice());

			bookings.add(booking);
			tripTitles.add(trip.getTitle());
			totalPaid = totalPaid.add(trip.getPrice());
		}

		bookingRepository.saveAll(bookings);

		favoriteRepository.deleteAllByCustomerAndTripIn(customer, trips);
		cartRepository.deleteAllByCustomer(customer);

		String totalFormatted = parsePrice(totalPaid, "EUR");

		StringBuilder emailBody = new StringBuilder();
		emailBody.append("<h2>Purchase Receipt</h2>");
		emailBody.append("<p>Thank you for your purchase, ").append(customer.getFirstName()).append("!</p>");
		emailBody.append("<hr>");
		emailBody.append("<table style='width:100%; border-collapse:collapse;'>");
		emailBody.append("<tr><th style='text-align:left;'>Trip</th><th style='text-align:right;'>Price</th></tr>");

		for (Booking booking : bookings) {
			emailBody.append("<tr>");
			emailBody.append("<td>").append(booking.getTrip().getTitle()).append("</td>");
			emailBody.append("<td style='text-align:right;'>").append(parsePrice(booking.getPricePaid(), booking.getTrip().getCurrency().name())).append("</td>");
			emailBody.append("</tr>");
		}

		emailBody.append("</table>");
		emailBody.append("<hr>");
		emailBody.append("<p><strong>Total: ").append(totalFormatted).append("</strong></p>");
		emailBody.append("<p>We hope you enjoy your trip!</p>");

		try {
			resendService.sendEmail(user.getEmail(), "Your Purchase Receipt", emailBody.toString());
		} catch (ResendException e) {
			throw new RuntimeException(e);
		}

		return new CheckoutOutDTO(tripTitles, totalFormatted);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public String removeBooking(String bookingId) {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new BookingNotFoundException("Booking not found"));

		if (!booking.getCustomer().getId().equals(customer.getId())) {
			throw new BookingNotFoundException("Booking not found");
		}

		Trip trip = booking.getTrip();

		trip.setStock(trip.getStock() + 1);
		tripRepository.save(trip);

		bookingRepository.delete(booking);

		StringBuilder emailBody = new StringBuilder();
		emailBody.append("<h2>Booking Cancellation</h2>");
		emailBody.append("<p>Hi ").append(customer.getFirstName()).append(", your booking has been cancelled.</p>");
		emailBody.append("<hr>");
		emailBody.append("<table style='width:100%; border-collapse:collapse;'>");
		emailBody.append("<tr><th style='text-align:left;'>Trip</th><th style='text-align:right;'>Refund</th></tr>");
		emailBody.append("<tr>");
		emailBody.append("<td>").append(trip.getTitle()).append("</td>");
		emailBody.append("<td style='text-align:right;'>").append(parsePrice(booking.getPricePaid(), trip.getCurrency().name())).append("</td>");
		emailBody.append("</tr>");
		emailBody.append("</table>");
		emailBody.append("<hr>");
		emailBody.append("<p><strong>Total refunded: ").append(parsePrice(booking.getPricePaid(), trip.getCurrency().name())).append("</strong></p>");
		emailBody.append("<p>We're sorry to see you go. Hope to see you again!</p>");

		try {
			resendService.sendEmail(user.getEmail(), "Booking Cancellation Confirmation", emailBody.toString());
		} catch (ResendException e) {
			throw new RuntimeException(e);
		}

		return trip.getTitle();
	}

	@Override
	@Transactional(readOnly = true)
	public List<BookingOutDTO> getBookings() {

		User user = authenticateUser();
		Customer customer = user.getCustomer();

		List<Booking> bookings = bookingRepository.findAllByCustomer(customer);

		return bookings.stream().map(booking -> {
			Trip trip = booking.getTrip();
			return new BookingOutDTO(
					booking.getId(),
					trip.getId(),
					trip.getCity() + " - " + trip.getCountry(),
					trip.getTitle(),
					parsePrice(booking.getPricePaid(), trip.getCurrency().name()),
					trip.getRating(),
					!trip.getImages().isEmpty() ? trip.getImages().get(0).getImageUrl() : null,
					booking.getPurchaseDate()
			);
		}).toList();
	}
}
