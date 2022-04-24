import bodyParser from 'body-parser'
import cors from "cors"
import express from 'express'
import { CONFIG } from './constanst.js'
import { handlingError } from './middlewares/handlingError.js'
import router from './routes/routes.js'
import fileUpload from 'express-fileupload'
import('dotenv').then(res => res.config())
import('./db.js')
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

const baseApiUrl = `/${CONFIG.API_ROOT}/${CONFIG.VERSIYON}/`
app.use(baseApiUrl, router)

//Error handling
app.use(handlingError);

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})