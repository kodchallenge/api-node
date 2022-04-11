import express from "express";
import { addSolution, getProblemSolutions, getUserSolutionByProblemId } from "../../controllers/problemSolution.controller.js";

const problemSolutionRouter = express.Router()

problemSolutionRouter.post("/", addSolution)
problemSolutionRouter.get("/userproblemsolution", getUserSolutionByProblemId)
problemSolutionRouter.get("/:id", getProblemSolutions)

export default problemSolutionRouter