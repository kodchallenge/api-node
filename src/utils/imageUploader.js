import { uploadCloudinaryImage } from "./cloudinary.js";

const uploadImage = async (file, options) => {
    try {
        const fileRes = await uploadCloudinaryImage(file.tempFilePath, options)
        return fileRes.url;
    } catch (err) {
        return null;
    }
}

export {
    uploadImage
}