import UserModel from "../models/user.model.js"
import { uploadImage } from "../utils/imageUploader.js"
import Result from "../utils/result.js"


const getAllUsers = async (req, res, next) => {
    const users = await UserModel.find()
    Result.success(res, "Listelendi", users)
}


const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params
        const user = await UserModel.findOne({_id: id})
        if(!user) {
            Result.error(res, "Kullanıcı bulunamadı", 404)
        } else {
            user.password = null
            Result.success(res, "Getirildi", user)
        }
    }catch(err) {
        next(err)
    }
}


const uploadUserPhoto = async (req, res, next) => {
    try {
        const {userId} = req.query
        
        const user = await UserModel.findOne({_id: userId})
        if(!user) {
            Result.error(res, "Kullanıcı bulunamadı", 404)
            return;
        }
    
        const photo = req.files.photo
        const photoUrl = await uploadImage(photo, {folder: "users"})
        if(photoUrl) {
            user.photo = photoUrl
            UserModel.updateOne({_id: userId}, {photo: photoUrl}, {upsert: true}, () => {})
            Result.success(res, "Fotoğraf yüklendi.")
        } else {
            Result.error(res, "Fotoğraf yüklenirken hata oluştu. Lütfen daha sonra deneyiniz.")
        }
    }catch(err) {
        next(err)
    }
}

export {
    getAllUsers,
    uploadUserPhoto,
    getUserById
}