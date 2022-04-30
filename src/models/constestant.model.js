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
    time: {
        type: Number,
    },
    totalScore: {
        type: Number,
    },
    ...baseModel
})

const ContestantModel = mongoose.model("contestant", contestantSchema)


export default ContestantModel