package com.api.tfg.repositories;

import com.api.tfg.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends JpaRepository<User, String> {

	User findByEmail(@Param("email") String email);

	boolean existsByEmail(String email);
}
