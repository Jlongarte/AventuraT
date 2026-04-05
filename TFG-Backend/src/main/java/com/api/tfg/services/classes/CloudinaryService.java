package com.api.tfg.services.classes;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

	private final Cloudinary cloudinary;

	public String upload(MultipartFile file) throws IOException {

		Map result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
				"folder", "tfg"
		));

		return result.get("secure_url").toString();
	}

	public void delete(String imageUrl) throws IOException {

		String imageRoute = "tfg/" + imageUrl;

		cloudinary.uploader().destroy(imageRoute, ObjectUtils.emptyMap());

	}
}
