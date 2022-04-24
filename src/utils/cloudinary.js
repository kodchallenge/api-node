import cloudinary from 'cloudinary'

const setConfig = () => {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

const cloudinaryInitialOptions = {
    folder: "main"
}

const uploadCloudinaryImage = async (imagePath, options = cloudinaryInitialOptions) => {
    setConfig()
    const fileRes = await cloudinary.v2.uploader.upload(imagePath, options)

    return fileRes;
}

export {
    uploadCloudinaryImage
}