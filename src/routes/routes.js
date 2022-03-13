import express from "express";
import codeRouter from "./api/code.route.js";
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
router.use("/compiler", codeRouter)


export default router