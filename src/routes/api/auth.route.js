import express from "express";
import { changePassword, login, logout, signup } from "../../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post("/signin", login)
authRouter.post("/logout", logout)
authRouter.post("/signup", signup)
authRouter.post("/changepassword", changePassword)

export default authRouter