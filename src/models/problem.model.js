import mongoose from "mongoose";
import baseModel from "./base.model.js";

const problemSchema = mongoose.Schema({
    name: String,
    description: String,
    functionName: String,
    baseCode: {
        type: Object,
    },
    difficulty: {
        type: String,
        default: "kolay",
        enum: ["kolay", "orta", "zor"]
    },
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
    private: {
        type: Boolean,
        default: false,
    },
    ...baseModel
})

const ProblemModel = mongoose.model("problems", problemSchema)


export default ProblemModel