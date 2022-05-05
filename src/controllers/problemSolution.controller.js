import CodeTestModel from "../models/codeTest.model.js"
import ContestantModel from "../models/constestant.model.js"
import problemSolutionModel from "../models/problemSolution.model.js"
import UserModel from "../models/user.model.js"
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
        const hasSolution = await problemSolutionModel.exists({user: codeTest.user, problem: codeTest.problem._id})
        if(hasSolution) {
            throw Error("Çözüm daha önce gönderilmiştir.")
        }
        const userScore = Math.ceil((codeTest.problem.score / codeTest.problem.io.length) * codeTest.rate.correct)
        const solutionData = {
            score: userScore,
            user: codeTest.user,
            problem: codeTest.problem,
            codeTest: codeTest._id,
        }
        const solution = await new problemSolutionModel(solutionData).save()
        if(!test.contestant) {
            await UserModel.updateOne({_id: codeTest.user}, {$push: { score: {track: codeTest.problem.track, score: userScore} }}, {})
        } else {
            await ContestantModel.updateOne({_id: test.contestant}, {$push: { solutions: solution._id }}, {})
        }
        Result.success(res, "Gönderildi")
    } catch(err) {
        next(err)
    }
}

const getUserSolutions = async (req, res, next) => {
    try {
        const {user} = req.query
    
        const solution = await problemSolutionModel.find({user: user}).populate("track")
        if(!solution) {
            throw Error("Herhangi bir çözümünüz bulunmamaktadır")
        }
        Result.success(res, "Çözümler getirildi", solution)
    } catch(err) {
        next(err)
    }
}

const getUserSolutionByProblemId = async (req, res, next) => {
    try {
        const {userId,problemId} = req.query
    
        const solution = await problemSolutionModel.findOne({user: userId, problem: problemId}).populate("codeTest")
        if(!solution) {
            throw Error("Çözümünüz bulunmamaktadır")
        }
        Result.success(res, "Çözüm getirildi", solution)
    } catch(err) {
        next(err)
    }
}

const getProblemSolutions = async (req, res, next) => {
    try {
        const {id} = req.params
        
        const solutions = await problemSolutionModel.find({problem: id}).sort({score: -1}).limit(10).populate("codeTest user")
        if(!solutions) {
            throw Error("Çözüm bulunmamaktadır.")
        }
        Result.success(res, "", solutions)
    }catch(err) {
        next(err)
    }
}

export {
    addSolution,
    getUserSolutionByProblemId,
    getProblemSolutions,
    getUserSolutions
}