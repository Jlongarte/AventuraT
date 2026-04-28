package com.api.tfg.repositories;

import com.api.tfg.models.Customer;
import com.api.tfg.models.Favorite;
import com.api.tfg.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IFavoriteRepository extends JpaRepository<Favorite, String> {

	Optional<Favorite> findByCustomerAndTrip(Customer customer, Trip trip);

	List<Favorite> findAllByCustomer(Customer customer);

	void deleteAllByCustomerAndTripIn(Customer customer, List<Trip> trips);
}