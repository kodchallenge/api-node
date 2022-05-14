import express from "express";
import { changePassword, login, logout, resetPassword, sendResetLink, signup } from "../../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post("/signin", login)
authRouter.post("/logout", logout)
authRouter.post("/signup", signup)
authRouter.post("/changepassword", changePassword)
authRouter.post("/sendresetlink", sendResetLink)
authRouter.post("/resetpassword", resetPassword)

export default authRouter