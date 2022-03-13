import express from "express";
import { addProblem, getAllByTrack, getAllProblem } from "../../controllers/problem.controller.js";

const problemRouter = express.Router()

problemRouter.get("/", getAllProblem)
problemRouter.post("/", addProblem)

problemRouter.get("/getallbytrackid", getAllByTrack)


export default problemRouter