import UserModel from "../models/user.model.js"
import Result from '../utils/result.js'
import jwt from 'jsonwebtoken'
import MongoError from "../utils/MongoError.js"
import bcrypt from 'bcrypt'
import { generateCode } from "../utils/generateCode.js"
import { sendMail } from "../utils/mailSender.js"

const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({ id }, 'MySuperPassword!', {
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
    } catch (err) {
        Result.error(res, err.message)
    }
}

const logout = (req, res, next) => {

}

const signup = async (req, res, next) => {
    const userData = req.body

    const code = generateCode(6, 6, true)
    userData.code = code
    const user = new UserModel(userData)
    user.save()
        .then((result) => {
            // const mailData = {
            //     to: userData.email,
            //     subject: "KodChallenge Hesap Onayı",
            //     html: `<h1 style='text-align: center;'>KodChallenge</h1>
            //         <div style='text-align: center;'>
            //             <h2>Hesabınızı onaylamak için lütfen aşağıdaki kodu giriniz</h2>
            //             <h3>${code}</h3>
            //         </div>`,
            // }
            // Result.success(res, "Kayıt başarılı, hesabınızı aktive etmek için mail adresinize kod gönderdik.")
            // sendMail(mailData).catch(err => {
            //     console.log({...err})
            // })
            Result.success(res, "Kayıt başarılı")
        })
        .catch(err => {
            let msg = "Hata oluştu"
            if (MongoError.unique(err, "username")) {
                msg = "Kullanıcı Adı kullanımda"
            }
            if (MongoError.unique(err, "email")) {
                msg = "Eposta kullanımda"
            }
            Result.error(res, msg)
        })
}

const changePassword = async (req, res, next) => {
    try {
        const data = req.body
        const user = await UserModel.findOne({ _id: data._id })
        if (!user) {
            Result.error(res, "Kullanıcı bulunamadı", 404)
            return;
        }
        const oldPwdCompare = await bcrypt.compare(data.oldPassword, user.password)
        if (!oldPwdCompare) {
            Result.error(res, "Eski şifreni hatalı girdin!")
            return
        }

        if (data.newPassword !== data.newPasswordRepeat) {
            Result.error(res, "Yeni şifreler uyuşmamaktadır")
            return
        }

        user.password = data.newPassword
        await user.save()

        Result.success(res, "Şifre değiştirildi")
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

const checkMailAddress = async (req, res, next) => {
    const { email } = req.body

}


const sendResetLink = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            Result.error(res, "Kullanıcı bulunamadı", 404)
        }
        const token = generateCode(16, 32) + '-' + user._id;
        const link = `${req.protocol}://${req.get("host")}/auth/reset-password?token=${token}`
        await UserModel.findOneAndUpdate({ email: email }, { resetToken: token })
        await sendMail({
            to: email,
            subject: "KodChallenge Şifre Sıfırlama",
            html: `<h1 style='text-align: center;'>KodChallenge</h1>
                <div style='text-align: center;'>
                    <h2>Şifrenizi sıfırlamak için lütfen aşağıdaki linke tıklayınız</h2>
                    <h3><a href="${link}">${link}</a></h3>
                </div>`,
        })

        Result.success(res, 'Şifre sıfırlama linki e-postana göderildi')
    } catch (error) {
        return new Error(error)
    }
}


const resetPassword = async (req, res, next) => {
    const {token, newPassword, newPasswordRepeat} = req.body

    const user = await UserModel.findOne({ resetToken: token })
    if (!user) {
        Result.error(res, "Geçersiz token", 404)
        return
    }

    if(newPassword !== newPasswordRepeat) {
        Result.error(res, "Şifreler uyuşmuyor.", 400)
        return
    }
    user.password = newPassword;
    user.resetToken = '';
    await user.save();
    Result.success(res, "Şifre başarıyla değiştirildi")
}

export {
    login,
    logout,
    signup,
    changePassword,
    sendResetLink,
    resetPassword,
}