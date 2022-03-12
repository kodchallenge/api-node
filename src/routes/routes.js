import express from "express";
import trackRouter from './api/track.route.js'
const router = express.Router()

router.get("/", (req, res, next) => {
    res.json({
        status: true,
        message: "Server is running"
    })
})

router.use("/tracks", trackRouter)


export default router