import UserModel from "../models/user.model.js"
import Result from "../utils/result.js"

const getHighScores = async (req, res, next) => {
    const users = await UserModel.find()
    const userScores = users.map(u => {
        const scores = u.score.map(({ score }) => score)
        const totalScore = scores.reduce((a, b) => a + b)
        return { ...u._doc, totalScore: totalScore }
    })
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 3)
    Result.success(res, "", userScores)
}

const getHighScoreByTrack = async (req, res, next) => {
    const track = req.query?.track
    if (!track) return

    const users = (await UserModel.find()).filter(u => u._doc)

    const userScores = users.map(u => {
            u.score.find(s => s.track.toString() === track)
            
        })
        .filter(x => x)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    Result.success(res, "", userScores)
}

export {
    getHighScores,
    getHighScoreByTrack
}