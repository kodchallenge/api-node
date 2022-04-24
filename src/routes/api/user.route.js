import express from "express";
import { getAllUsers, getUserById, uploadUserPhoto } from "../../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.post("/uploadphoto", uploadUserPhoto)
userRouter.get("/:id", getUserById)

export default userRouter