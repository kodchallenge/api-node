import ContestModel from "../models/contest.model.js"
import ProblemModel from "../models/problem.model.js"
import Result from "../utils/result.js"

const getAllContests = async (req, res, next) => {
    const contests = await ContestModel.find()
    Result.success(res, "Listelendi", contests)
}

const getActiveContests = async (req, res, next) => {
    const contests = await ContestModel.find({startDate: {$lte: new Date()}}).populate("-problems -user")
    Result.success(res, "Listelendi", contests)
}

const createContest = async (req, res, next) => {
    const {contest, problems} = req.body
    console.log(problems)
    
    if(!req.body.autoProblem) {
        const problemPromises = problems.map(problem => {
            return new Promise((resolve, reject) => {
                problem.private = true
                const newProblem = new ProblemModel(problem)
                newProblem.save().then(savedProblem => {
                    resolve(savedProblem._id)
                })
            })
        })
        await Promise.all(problemPromises).then(problems => {
            contest.problems = [...problems]
            new ContestModel(contest).save()
        })
    }
    //ToDo: Short Link Oluştur
    Result.success(res, "Yarışma oluşturuldu")
}


export {
    getAllContests,
    getActiveContests,
    createContest
}