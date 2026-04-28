package com.api.tfg.repositories;

import com.api.tfg.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerRepository extends JpaRepository<Customer, String> {

	boolean existsByPhone(String phone);
}
