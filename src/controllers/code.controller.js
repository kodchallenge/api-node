import axios from "axios"
import CodeTestModel from "../models/codeTest.model.js"
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
    
        console.log(code)
        axios.post(process.env.CODE_COMPILER_URL+"code/compiler", code)
            .then((response) => {
                Result.success(res, "Code compiled", response.data)
            })
            .catch((err) => {
                res.json({err})
                console.log(err.message)
            })
    }catch(err) {
        next(err)
        console.log(err)
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
                const testData = response.data
                if(!testData) {
                    throw Error("Test başarısız!")
                }
                const codeTest = new CodeTestModel({
                    problem: code.problem,
                    user: "6237345d2429d710bdd48587",
                    code: code.code,
                    rate: {
                        correct: testData.filter(x => x.status).length,
                        wrong: testData.filter(x => !x.status).length
                    },
                    test: [...testData],
                })
                
                codeTest.save()
                Result.success(res, "End code test", {tests: testData, _id: codeTest._id})
            })
            .catch((err) => {
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