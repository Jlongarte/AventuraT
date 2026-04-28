package com.api.tfg.repositories;

import com.api.tfg.models.Booking;
import com.api.tfg.models.Customer;
import com.api.tfg.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IBookingRepository extends JpaRepository<Booking, String> {

	Optional<Booking> findByCustomerAndTrip(Customer customer, Trip trip);

	List<Booking> findAllByCustomer(Customer customer);

	boolean existsByDocumentNumberAndTrip(String documentNumber, Trip trip);
}
