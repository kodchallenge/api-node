import express from "express";
import trackRouter from './api/track.route.js'
import difficultyRouter from "./static/difficulty.model.js";
const router = express.Router()

router.get("/", (req, res, next) => {
    res.json({
        status: true,
        message: "Server is running"
    })
})

router.use("/tracks", trackRouter)
router.use("/difficulties", difficultyRouter)


export default router