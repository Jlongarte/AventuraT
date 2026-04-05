package com.api.tfg.services.interfaces;

import com.api.tfg.dto.in.RegisterCustomerInDTO;
import com.api.tfg.dto.out.BookingOutDTO;
import com.api.tfg.dto.in.CheckoutInDTO;
import com.api.tfg.dto.out.CheckoutOutDTO;
import com.api.tfg.dto.out.ProductCardOutDTO;
import com.api.tfg.dto.out.RegisterCustomerOutDTO;

import java.util.List;

public interface ICustomerService {

	RegisterCustomerOutDTO registerCustomer(RegisterCustomerInDTO data);

	String addToFavorite(String tripId);

	String removeFromFavorite(String tripId);

	List<ProductCardOutDTO> getFavorites();

	String addToCart(String tripId);

	String removeFromCart(String tripId);

	List<ProductCardOutDTO> getCart();

	CheckoutOutDTO checkout(CheckoutInDTO data);

	String removeBooking(String tripId);

	List<BookingOutDTO> getBookings();
}
