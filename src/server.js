import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import './db.js'
import router from './routes/routes.js'
import { CONFIG } from './constanst.js'
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const baseApiUrl = `/${CONFIG.API_ROOT}/${CONFIG.VERSIYON}/`
app.use(baseApiUrl, router)

//Error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 400).json({
        status: false,
        error: err
    })
});

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})