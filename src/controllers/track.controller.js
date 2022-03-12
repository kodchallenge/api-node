import TrackModel from "../models/track.model.js"

const getAllTrackList = async (req, res, next) => {
    const tracks = await TrackModel.find()
    res.status(200).json({
        data: tracks,
        message: "Kategoriler listelendi"
    })
}

const addTrack = async (req, res, next) => {
    const track = req.body
    await new TrackModel(track).save()
    res.status(200).json({
        message: "Kategori eklendi"
    })
}

export {
    getAllTrackList,
    addTrack
}