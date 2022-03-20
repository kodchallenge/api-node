import express from "express";
import { runCode, runTest } from "../../controllers/code.controller.js";

const codeRouter = express.Router()

codeRouter.post("/runcode", runCode)
codeRouter.post("/runtest", runTest)


export default codeRouter