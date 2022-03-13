import ProblemModel from "../models/problem.model.js"
import Result from "../utils/Result.js"


const getAllProblem = async (req, res, next) => {
    const problems = await ProblemModel.find().populate('track')
    Result.success(res, "Tüm problemler getirildi", problems)
}

const addProblem = async (req, res, next) => {
    const problem = req.body
    await new ProblemModel(problem).save()
    Result.success(res, "Problem Eklendi")
}

const getAllByTrack = async (req, res, next) => {
    const trackId = req.query.track
    const problems = await ProblemModel.find({track: trackId}).populate('track')
    Result.success(res, "Kategoriye ait problemler getirildi", problems)
}

export {
    getAllProblem,
    addProblem,
    getAllByTrack
}