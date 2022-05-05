import express from "express";
import { getContestantByUserId, getContestantByContest, isUserJoinedContest, registerContest, startContest, finishContest } from "../../controllers/contestant.controller.js";

const contestantRoute = express.Router()

contestantRoute.post("/register", registerContest)
contestantRoute.get("/getbycontest", getContestantByContest)
contestantRoute.get("/isuserjoinedcontest", isUserJoinedContest)
contestantRoute.get("/getcontestant", getContestantByUserId)
contestantRoute.post("/startcontest", startContest)
contestantRoute.post("/finishcontest", finishContest)


export default contestantRoute;