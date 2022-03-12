import mongoose from "mongoose";

const trackSchema = mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    icon: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: true
    },
})

const TrackModel = mongoose.model("tracks", trackSchema)


export default TrackModel