package com.api.tfg.repositories;

import com.api.tfg.models.Guide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface IGuideRepository extends JpaRepository<Guide, String> {

	Guide findByEmail(@Param("email") String email);

	Boolean existsByEmail(@Param("email") String email);
}
