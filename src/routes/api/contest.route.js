import express from "express";
import { createContest, getActiveContests, getAllContests, getContestById } from "../../controllers/contest.controller.js";

const contestRouter = express.Router();

contestRouter.get("/", getAllContests)
contestRouter.post("/", createContest)
contestRouter.get("/active", getActiveContests)
contestRouter.get("/:id", getContestById)

export default contestRouter;