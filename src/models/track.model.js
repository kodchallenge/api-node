import mongoose from "mongoose";
import baseModel from "./base.model.js";

const trackSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Track name is required"],
        unique: [true, "Track name is unique"],
    },
    slug: {
        type: String,
        require: [true, "Track slug is required"],
        unique: [true, "Track slug is unique"]
    },
    description: {
        type: String,
        require: [true, "Track description is required"],
        min: [10, "Description must be at least 10 characters"],
        min: [100, "Description must be at max 100 characters"]
    },
    icon: {
        type: String,
        require: [true, "Track icon link is required"]
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "problems"
    }],
    ...baseModel
})

const TrackModel = mongoose.model("tracks", trackSchema)


export default TrackModel