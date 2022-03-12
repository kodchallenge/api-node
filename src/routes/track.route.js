import express from "express";
import { addTrack, getAllTrackList } from "../controllers/track.controller.js";

const trackRouter = express.Router()

trackRouter.get("/", getAllTrackList)
trackRouter.post("/", addTrack)

export default trackRouter