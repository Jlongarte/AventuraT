package com.api.tfg.repositories;

import com.api.tfg.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IImageRepository extends JpaRepository<Image, String> {

	@Query(value = "SELECT image_url FROM images ORDER BY RAND() LIMIT :limit;", nativeQuery = true)
	List<String> findRandomImages(@Param("limit") int limit);
}
