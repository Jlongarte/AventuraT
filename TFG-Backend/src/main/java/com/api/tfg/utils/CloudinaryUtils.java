package com.api.tfg.utils;

public class CloudinaryUtils {

	public static String extractPublicImageId(String imageUrl) {

		String[] parts = imageUrl.split("/");
		String imageNameWithExtension = parts[parts.length - 1];
		String publicImageId = imageNameWithExtension.split("\\.")[0];

		return publicImageId;
	}
}
