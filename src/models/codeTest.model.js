import mongoose from "mongoose";
import baseModel from "./base.model.js";

const codeTestSchema = mongoose.Schema({
    code: String,
    rate: {
        type: Object,
        default: {
            correct: 0,
            wrong: 0
        }
    },
    test: [],
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problems"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    ...baseModel
})

const CodeTestModel = mongoose.model("codeTests", codeTestSchema)


export default CodeTestModel