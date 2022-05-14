import ContestantModel from "../models/constestant.model.js"
import Result from "../utils/result.js"

const registerContest = async (req, res, next) => {
    try {
        const check = await ContestantModel.findOne({contest: req.body.contest, user: req.body.user})
        if(check)
            throw Error("Zaten yarışmaya katıldın")
        const contestant = new ContestantModel({...req.body})
        await contestant.save()
        Result.success(res, "Yarışmaya Katıldın")
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}

const getContestantByContest = async (req, res, next) => {
    const {contest} = req.query
    try {
        const contestants = await ContestantModel.find({contest: contest}).populate("contest")
        Result.success(res, "Yarışmaya Katılanlar", contestants)
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}

const isUserJoinedContest = async (req, res, next) => {
    const {contest, user} = req.query
    try {
        const contestant = await ContestantModel.findOne({contest: contest, user: user})
        if(contestant)
            Result.success(res, "Katıldın", contestant)
        else
            Result.error(res, "Katılmadın")
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}

const getContestantByUserId = async (req, res, next) => {
    const {user, contest} = req.query
    try {
        const contestant = await ContestantModel.findOne({user: user, contest: contest}).populate("contest solutions")
        .populate({ 
            path: 'solutions',
            populate: "codeTest problem"
        }).populate({
            path: "contest",
            populate: "problems"
        })
        Result.success(res, "", contestant)
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}

const startContest = async (req, res, next) => {
    const {user, contest} = req.body
    try {
        const contestant = await ContestantModel.findOne({user: user, contest: contest})
        if(contestant && contestant?.state == "pending") {
            contestant.state = "starting"
            contestant.startTime = Date.now()
            await contestant.save()
            Result.success(res, "Başladı")
        }
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}

const finishContest = async (req, res, next) => {
    const {user, contest} = req.body
    try {
        const contestant = await ContestantModel.findOne({user: user, contest: contest}).populate("solutions")
        if(contestant) {
            contestant.state = "finished"
            contestant.endTime = Date.now() - new Date(contestant.startTime)
            contestant.totalScore = contestant.solutions?.reduce((total, solution) => {return total += solution.score}, 0) || 0
            await contestant.save()
            Result.success(res, "Bitti")
        }
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}

export {
    registerContest,
    getContestantByContest,
    isUserJoinedContest,
    getContestantByUserId,
    startContest,
    finishContest
}