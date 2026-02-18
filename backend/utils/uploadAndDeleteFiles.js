import { cloudinary } from "../lib/cloudinary.js";

export const uploadImage = async (fileBuffer, folder = "uploads") => {
  const uploadOptions = {
    folder: folder,
    resource_type: "auto",

    transformation: [{ quality: "auto", fetch_format: "auto" }],
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result);
      },
    );
    stream.end(fileBuffer);
  });
};

export const deleteImage = async (publicId) => {
  try {
    if (!publicId) return null;
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      console.warn(`Cloudinary warning for ${publicId}:`, result);
    }

    return result;
  } catch (error) {
    console.error(`Failed to delete image ${publicId}:`, error);
    return null;
  }
};
