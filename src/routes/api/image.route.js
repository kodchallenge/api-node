import express from 'express'
import { imageUpload } from '../../controllers/image.controller.js'
import multer from "multer"

// const fileUploader = multer({})

const imageRouter = express.Router()

imageRouter.post("/upload", imageUpload)

export default imageRouter