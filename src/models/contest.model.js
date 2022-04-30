import mongoose from "mongoose";
import baseModel from "./base.model.js";

const contestSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    maxUser: {
        type: Number,
        default: Infinity
    },
    public: {
        type: Boolean,
        default: true
    },
    award: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    shortLink: {
        type: String
    },
    poster: {
        type: String
    },
    problems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "problems"
        }
    ],
    ...baseModel
})

const ContestModel = mongoose.model("contests", contestSchema)

export default ContestModel