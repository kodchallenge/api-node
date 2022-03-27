import UserModel from "../models/user.model.js"
import Result from '../utils/result.js'
import jwt from 'jsonwebtoken'
import MongoError from "../utils/MongoError.js"

const maxAge = 60*60*24
const createToken = (id) => {
    return jwt.sign({id}, 'MySuperPassword!', {
        expiresIn: maxAge
    })
}

const login = async (req, res, next) => {
    const authData = req.body
    try {
        const user = await UserModel.login(authData.username, authData.password)
        const token = createToken(user._id)
        const authResponse = {
            user: user,
            token: token
        }
        Result.success(res, "Giriş Başarılı", authResponse)
    }catch(err) {
        Result.error(res, err.message)
    }
}

const logout = (req, res, next) => {

}

const signup = async (req, res, next) => {
    const userData = req.body
    
    const user = new UserModel(userData)
    user.save()
    .then((result) => {
        Result.success(res, "Kayıt başarılı")
    })
    .catch(err => {
        let msg = "Hata oluştu"
        if(MongoError.unique(err, "username")) {
            msg = "Kullanıcı Adı kullanımda"
        }
        if(MongoError.unique(err, "email")) {
            msg = "Eposta kullanımda"
        }
        Result.error(res, msg)
    })
}


export {
    login,
    logout,
    signup
}