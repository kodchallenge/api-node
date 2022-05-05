import mongoose from "mongoose";
import baseModel from "./base.model.js";

const contestantSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contests"
    },
    solutions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "problemSolutions"
        }
    ],
    startTime: {
        type: Date,
    },
    endTime: {
        type: Number,
        default: 0,
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    state: {
        type: String,
        default: "pending",
        enum: ["pending", "starting", "finished"]
    },
    ...baseModel
})

const ContestantModel = mongoose.model("contestant", contestantSchema)


export default ContestantModel