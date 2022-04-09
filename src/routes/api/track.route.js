import express from "express";
import { addTrack, changeTrackStatus, getAllTrackList, updateTrack } from "../../controllers/track.controller.js";

const trackRouter = express.Router()

trackRouter.get("/", getAllTrackList)
trackRouter.post("/", addTrack)
trackRouter.put("/", updateTrack)
trackRouter.post("/changestatus", changeTrackStatus)

export default trackRouter