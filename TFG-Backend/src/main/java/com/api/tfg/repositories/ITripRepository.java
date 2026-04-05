package com.api.tfg.repositories;

import com.api.tfg.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ITripRepository extends JpaRepository<Trip, String> {

	@Query(value = "SELECT * FROM trips WHERE trips.id = :id FOR UPDATE", nativeQuery = true)
	Optional<Trip> findByIdWithLock(@Param("id") String id);

	@Query(value = "SELECT * FROM trips ORDER BY RAND() LIMIT :limit;", nativeQuery = true)
	List<Trip> findRandomTrips(@Param("limit") int limit);

	@Query(value = "SELECT * FROM trips " +
			"WHERE trips.id NOT IN (SELECT carts.trip_id FROM carts WHERE carts.customer_id = :customerId) " +
			"AND trips.id NOT IN (SELECT bookings.trip_id FROM bookings WHERE bookings.customer_id = :customerId) " +
			"ORDER BY trips.start_date ASC LIMIT :limit OFFSET :offset", nativeQuery = true)
	List<Trip> findTripsExcludingCustomer(@Param("customerId") String customerId,
										  @Param("limit") int limit,
										  @Param("offset") int offset);

	@Query(value = "SELECT * FROM trips ORDER BY trips.start_date ASC LIMIT :limit OFFSET :offset", nativeQuery = true)
	List<Trip> findTripsPaginated(@Param("limit") int limit, @Param("offset") int offset);

	@Query(value = "SELECT * FROM trips " +
			"WHERE trips.is_discount = TRUE " +
			"AND trips.id NOT IN (SELECT carts.trip_id FROM carts WHERE carts.customer_id = :customerId) " +
			"AND trips.id NOT IN (SELECT bookings.trip_id FROM bookings WHERE bookings.customer_id = :customerId) " +
			"ORDER BY trips.start_date ASC", nativeQuery = true)
	List<Trip> findDiscountTripsExcludingCustomer(@Param("customerId") String customerId);

	@Query(value = "SELECT * FROM trips WHERE trips.is_discount = TRUE ORDER BY trips.start_date ASC", nativeQuery = true)
	List<Trip> findDiscountTrips();

}
