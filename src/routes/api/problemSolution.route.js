import express from "express";
import { addSolution } from "../../controllers/problemSolution.controller.js";

const problemSolutionRouter = express.Router()

problemSolutionRouter.post("/", addSolution)

export default problemSolutionRouter