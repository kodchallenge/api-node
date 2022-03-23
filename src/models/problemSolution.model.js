import mongoose from "mongoose";
import baseModel from "./base.model.js";

const problemSolutionSchema = mongoose.Schema({
    score: {
        type: Number,
        default: 0,
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problems"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    codeTest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "codeTests"
    },
    ...baseModel
})

const problemSolutionModel = mongoose.model("problemSolutions", problemSolutionSchema)

export default problemSolutionModel