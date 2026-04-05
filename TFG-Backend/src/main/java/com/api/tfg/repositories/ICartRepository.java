package com.api.tfg.repositories;

import com.api.tfg.models.Cart;
import com.api.tfg.models.Customer;
import com.api.tfg.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ICartRepository extends JpaRepository<Cart, String> {

	Optional<Cart> findByCustomerAndTrip(Customer customer, Trip trip);

	List<Cart> findAllByCustomer(Customer customer);

	void deleteAllByCustomer(Customer customer);
}