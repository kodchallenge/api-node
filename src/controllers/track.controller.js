import ProblemModel from "../models/problem.model.js"
import TrackModel from "../models/track.model.js"
import MongoError from "../utils/MongoError.js"
import Result from "../utils/result.js"

const getAllTrackList = async (req, res, next) => {
    const tracks = await TrackModel.find().populate("problems")
    Result.success(res, "Kategori listelendi", tracks)
}

const addTrack = async (req, res, next) => {
    const track = req.body
    try {
        await new TrackModel(track).save()
        Result.success(res, "Kategori eklendi")
    } catch(err) {
        let msg = "Interval Server Error";
        if(MongoError.unique(err, "name")) {
            msg = "Track adı zaten kullanımda"
        }
        if(MongoError.unique(err, "slug")) {
            msg = "Track slug zaten kullanımda"
        }
        Result.error(res, msg)
    }
}

export {
    getAllTrackList,
    addTrack
}   