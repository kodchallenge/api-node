import cloudinary from 'cloudinary'
import { uploadCloudinaryImage } from '../utils/cloudinary.js'
import Result from '../utils/result.js'

const imageUpload = async (req, res, next) => {
    try {
        const file = req.files.photo

        const fileRes = await uploadCloudinaryImage(file.tempFilePath)
        Result.success(res, "Uploaded image", fileRes.url)
    } catch (err) {
        next(err)
    }
}

export {
    imageUpload,
}