import CodeTestModel from "../models/codeTest.model.js"
import problemSolutionModel from "../models/problemSolution.model.js"
import Result from "../utils/result.js"
import { isObjectId } from "../utils/Util.js"

const addSolution = async (req, res, next) => {
    const test = req.body
    try {
        if(!isObjectId(test._id)) {
            throw Error("Öncelikle testleri başlatın")
        }
    
        const codeTest = await CodeTestModel.findOne({_id: test._id}).populate("problem")
        if(!codeTest) {
            throw Error("Kod test bulunamadı")
        }
        const hasSolution = problemSolutionModel.findOne({user: codeTest.user, problem: codeTest.problem})
        if(hasSolution) {
            throw Error("Çözüm daha önce gönderilmiştir.")
        }
        const userScore = (codeTest.problem.score / codeTest.problem.io.length) * codeTest.rate.correct
        const solutionData = {
            score: userScore,
            user: codeTest.user,
            problem: codeTest.problem,
            codeTest: codeTest._id,
        }
        await new problemSolutionModel(solutionData).save()
        Result.success(res, "Gönderildi")
    } catch(err) {
        console.log(err)
        next(err)
    }
}

export {
    addSolution
}