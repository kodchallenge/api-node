import express from "express";
import { addSolution, getProblemSolutions, getUserSolutionByProblemId, getUserSolutions } from "../../controllers/problemSolution.controller.js";

const problemSolutionRouter = express.Router()

problemSolutionRouter.post("/", addSolution)
problemSolutionRouter.get("/userproblemsolution", getUserSolutionByProblemId)
problemSolutionRouter.get("/usersolutions", getUserSolutions)
problemSolutionRouter.get("/:id", getProblemSolutions)

export default problemSolutionRouter