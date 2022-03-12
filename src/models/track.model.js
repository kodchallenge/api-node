import mongoose from "mongoose";
import baseModel from "./base.model.js";

const trackSchema = mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    icon: String,
    ...baseModel
})

const TrackModel = mongoose.model("tracks", trackSchema)


export default TrackModel