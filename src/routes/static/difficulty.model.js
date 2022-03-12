import express from "express";
import { DIFFICULTY } from "../../constanst.js";
import Result from "../../utils/Result.js";

const difficultyRouter = express.Router()

difficultyRouter.get("/", (req, res, next) => {
    const difficulties = Object.values(DIFFICULTY)
    //ToDo çoklu dil desteğine göre değişkenlik göster
    Result.success(res, "", difficulties)
})

export default difficultyRouter