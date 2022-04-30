import express from "express";
import { createContest, getActiveContests, getAllContests } from "../../controllers/contest.controller.js";

const contestRouter = express.Router();

contestRouter.get("/", getAllContests)
contestRouter.post("/", createContest)
contestRouter.get("/active", getActiveContests)

export default contestRouter;