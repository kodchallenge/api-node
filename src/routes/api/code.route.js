import express from "express";
import { runCode } from "../../controllers/code.controller.js";

const codeRouter = express.Router()

codeRouter.post("/runcode", runCode)


export default codeRouter