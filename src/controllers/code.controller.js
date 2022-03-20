import axios from "axios"
import ProblemModel from "../models/problem.model.js"
import Result from "../utils/result.js"
import { isObjectId } from "../utils/Util.js"
const runCode = async (req, res, next) => {
    const code = req.body

    if(!isObjectId(code.problem)) {
        Result.error(res, "Problem id geçersiz.")
        return;
    
    }
    try {
        const problem = await ProblemModel.findOne({_id: code.problem})
        code.functionName = problem.functionName
        code.params = problem.io[0].input
    
        axios.post(process.env.CODE_COMPILER_URL+"code/compiler", code)
            .then((response) => {
                Result.success(res, "Code compiled", response.data)
            })
            .catch((err) => {
                console.log(err)
                res.json({err})
            })
    }catch(err) {
        next(err)
    }
    
}

const runTest = async (req, res, next) => {
    const code = req.body

    if(!isObjectId(code.problem)) {
        Result.error(res, "Problem id geçersiz.")
        return;
    }

    try {
        const problem = await ProblemModel.findOne({_id: code.problem})
        code.functionName = problem.functionName
        code.params = problem.io[0].input
        code.io = problem.io
    
        axios.post(process.env.CODE_COMPILER_URL+"code/runtest", code)
            .then((response) => {
                Result.success(res, "End code test", response.data)
            })
            .catch((err) => {
                console.log(err)
                res.json({err})
            })
    }catch(err) {
        next(err)
    }
}

export {
    runCode,
    runTest
}