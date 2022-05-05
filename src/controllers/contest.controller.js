import ContestantModel from "../models/constestant.model.js"
import ContestModel from "../models/contest.model.js"
import ProblemModel from "../models/problem.model.js"
import Result from "../utils/result.js"

const getAllContests = async (req, res, next) => {
    try {
        let contests = await ContestModel.find()
        Promise.all(contests.map(contest => {
            return new Promise((resolve, reject) => {
                ContestantModel.find({ contest: contest._id }).then(contestant => {
                    // console.log(contestant)
                    // contest.totalJoined = contestant.length
                    resolve({...contest._doc, totalJoined: contestant.length})
                    // resolve({...contest, totalJoined: contestant.length})
                })
            })
        })).then(result => {
            console.log(result)
            Result.success(res, "Listelendi", result)
        })
    } catch (err) {
        next(err)
        console.log(err)
    }
}

const getActiveContests = async (req, res, next) => {
    const contests = await ContestModel.find({ startDate: { $lte: new Date() } }).select("-problems -user")
    Result.success(res, "Listelendi", contests)
}

const createContest = async (req, res, next) => {
    const { contest, problems } = req.body
    console.log(problems)

    if (!req.body.autoProblem) {
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

const getContestById = async (req, res, next) => {
    try {
        const {id} = req.params 
        const contest = await ContestModel.findById(id).populate("problems")
        const contestants = await ContestantModel.find({ contest: id })
        contest.totalJoined = contestants.length
        Result.success(res, "Yarışma", contest)
    } catch (err) {
        next(err)
    }
}


export {
    getAllContests,
    getActiveContests,
    createContest,
    getContestById
}