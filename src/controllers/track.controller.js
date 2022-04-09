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

const updateTrack = async (req, res, next) => {
    const {name, slug, description, icon, _id} = req.body
    try {
        const currentTrack = await TrackModel.findOne({_id: _id})
        if(!currentTrack) {
            Result.error(res, "Track not found")
        } else {
            TrackModel.updateOne({_id: _id}, {name, slug, description, icon}, {upsert: true}, (err) => {console.log(err)})
            Result.success(res, "Updated track")
        }
    } catch(err) {
        Result.error(res, "Interval Server Error")
    }
}


const changeTrackStatus = async (req, res, next) => {
    const {_id, status} = req.body
    try {
        const currentTrack = await TrackModel.findOne({_id: _id})
        if(!currentTrack) {
            Result.error(res, "Track not found")
        } else {
            TrackModel.updateOne({_id: _id}, {status}, {upsert: true}, (err) => {})
            Result.success(res, status ? "Track is opened" : "Track is closed")
        }
    }catch(err) {
        next(err)
    }
}

export {
    getAllTrackList,
    addTrack,
    updateTrack,
    changeTrackStatus
}