import express from "express";
import authRouter from "./api/auth.route.js";
import codeRouter from "./api/code.route.js";
import contestRouter from "./api/contest.route.js";
import imageRouter from "./api/image.route.js";
import problemRouter from "./api/problem.route.js";
import problemSolutionRouter from "./api/problemSolution.route.js";
import scoreRouter from "./api/score.route.js";
import trackRouter from './api/track.route.js'
import userRouter from "./api/user.route.js";
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
router.use("/auth", authRouter)
router.use("/problemsolutions", problemSolutionRouter)
router.use("/users", userRouter)
router.use("/score", scoreRouter)
router.use("/images", imageRouter)
router.use("/contests", contestRouter)

export default router