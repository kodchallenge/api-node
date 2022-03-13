import express from "express";
import problemRouter from "./api/problem.route.js";
import trackRouter from './api/track.route.js'
import difficultyRouter from "./static/difficulty.route.js";
const router = express.Router()

router.get("/", (req, res, next) => {
    res.json({
        status: true,
        message: "Server is running"
    })
})

router.use("/tracks", trackRouter)
router.use("/difficulties", difficultyRouter)
router.use("/problems", problemRouter)


export default router