import ProblemModel from "../models/problem.model.js"
import TrackModel from "../models/track.model.js"
import Result from "../utils/Result.js"

const getAllTrackList = async (req, res, next) => {
    const tracks = await TrackModel.find().populate("problems")
    Result.success(res, "Kategori listelendi", tracks)
}

const addTrack = async (req, res, next) => {
    const track = req.body
    await new TrackModel(track).save()
    Result.success(res, "Kategori eklendi")
}

export {
    getAllTrackList,
    addTrack
}