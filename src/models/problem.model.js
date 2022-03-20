import mongoose from "mongoose";
import baseModel from "./base.model.js";

const problemSchema = mongoose.Schema({
    name: String,
    description: String,
    functionName: String,
    baseCode: String,
    difficulty: String,
    score: Number,
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tracks"
    },
    io: [
        {
            type: Object,
            default: {
                input: "",
                output: ""
            }
        }
    ],
    ...baseModel
})

const ProblemModel = mongoose.model("problems", problemSchema)


export default ProblemModel