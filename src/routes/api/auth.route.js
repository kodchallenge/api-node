import express from "express";
import { login, logout, signup } from "../../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post("/signin", login)
authRouter.post("/logout", logout)
authRouter.post("/signup", signup)

export default authRouter