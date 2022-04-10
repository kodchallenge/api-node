import express from "express";
import { addProblem, getAllProblemByTrack, getAllProblem, getProblemById, getProblemDifficulty } from "../../controllers/problem.controller.js";

const problemRouter = express.Router()

problemRouter.get("/", getAllProblem)
problemRouter.post("/", addProblem)

problemRouter.get("/getallbytrackid", getAllProblemByTrack)
problemRouter.get("/difficulties", getProblemDifficulty)
problemRouter.get("/:id", getProblemById)


export default problemRouter