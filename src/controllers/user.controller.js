import UserModel from "../models/user.model.js"
import Result from "../utils/result.js"


const getAllUsers = async (req, res, next) => {
    const users = await UserModel.find()
    Result.success(res, "Listelendi", users)
}

export {
    getAllUsers
}