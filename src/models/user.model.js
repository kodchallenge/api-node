import mongoose from 'mongoose'
import baseModel from './base.model.js'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    ...baseModel
})

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username})
    if(!user) throw Error("Kullanıcı Adı hatalı")
    
    const auth = await bcrypt.compare(password, user.password)
    if(!auth) throw Error("Şifre Hatalı")
    user.password = null
    return user
}

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel