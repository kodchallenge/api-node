import ProblemModel from "../models/problem.model.js"
import Result from "../utils/result.js"
import { isObjectId } from "../utils/Util.js"


const getAllProblem = async (req, res, next) => {
    const problems = await ProblemModel.find().populate('track').select("-functionName -io")
    Result.success(res, "Tüm problemler getirildi", problems)
}

const addProblem = async (req, res, next) => {
    const problem = req.body
    await new ProblemModel(problem).save()
    Result.success(res, "Problem Eklendi")
}

const getAllProblemByTrack = async (req, res, next) => {
    const trackId = req.query.track
    const problems = await ProblemModel.find({track: trackId}).populate('track').select("-functionName -io")
    Result.success(res, "Kategoriye ait problemler getirildi", problems)
}

const getProblemById = async (req, res, next) => {
    const id = req.params.id
    if (!isObjectId(id)) {
        Result.error(res, "Problem id geçersiz")
    }
    const problem = await ProblemModel.findOne({_id: id}).populate("track").select("-functionName -io")
    Result.success(res, "Problem getirildi", problem)
}

export {
    getAllProblem,
    addProblem,
    getAllProblemByTrack,
    getProblemById,
}