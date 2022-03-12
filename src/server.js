import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import trackRouter from './routes/track.route.js'
import './db.js'
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.get("/", (req, res, next) => {
    res.json({
        status: true,
        message: "Server is running"
    })
})

app.use("/tracks", trackRouter)


//Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        status: false,
        error: err
    })
});

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})