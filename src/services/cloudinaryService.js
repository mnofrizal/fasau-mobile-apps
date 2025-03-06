import { CLOUDINARY_CONFIG } from "../constants";

export const cloudinaryService = {
  uploadImage: async (imageUri) => {
    try {
      // Convert local file uri to blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg", // Assuming JPEG, you might want to detect this
        name: "upload.jpg",
      });
      formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
      formData.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

      // Upload to Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok) {
        return uploadResult.secure_url;
      } else {
        throw new Error(
          uploadResult.error?.message || "Failed to upload image"
        );
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  },
};
