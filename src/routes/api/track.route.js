import express from "express";
import { addTrack, getAllTrackList, updateTrack } from "../../controllers/track.controller.js";

const trackRouter = express.Router()

trackRouter.get("/", getAllTrackList)
trackRouter.post("/", addTrack)
trackRouter.put("/", updateTrack)

export default trackRouter