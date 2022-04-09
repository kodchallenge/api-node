import express from "express";
import { getHighScoreByTrack, getHighScores } from "../../controllers/score.controller.js";

const scoreRouter = express.Router()

scoreRouter.get("/highscores", getHighScores)
scoreRouter.get("/highscorebytrack", getHighScoreByTrack)

export default scoreRouter