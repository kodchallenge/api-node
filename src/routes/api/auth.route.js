import express from "express";
import { login, logout } from "../../controllers/auth.controller.js";

const authRouter = express.Router()

codeRouter.post("/login", login)
codeRouter.post("/logout", logout)
codeRouter.post("/signup", signup)

export default authRouter