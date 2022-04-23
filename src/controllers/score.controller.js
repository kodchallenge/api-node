import problemSolutionModel from "../models/problemSolution.model.js"
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

// const getHighScoreByTrack = async (req, res, next) => {
//     try {
//         const track = req.query?.track
//         if (!track) return
    
//         const users = (await UserModel.find()).filter(u => u._doc)
//         console.log(users)
//         const userScores = users.map(u => {
//                 u.score.find(s => s.track.toString() === track)  
//             })
//             .filter(x => x)
//             .sort((a, b) => b.score - a.score)
//             .slice(0, 3)
//         Result.success(res, "", userScores)
//     } catch(err) {
//         next(err)
//     }
// }

const getHighScoreByTrack = async (req, res, next) => {
    try {
        const {track} = req.query
        if (!track) throw Error("Not found track")
    
        const allSolutions = await problemSolutionModel
            .aggregate([
                {
                    $match: {
                        "track": track
                    }
                },
                {
                    $group: {
                        _id: "$user",
                        score: {$sum: "$score"}
                    }
                },
                {
                    $limit: 3
                },
                {
                    $sort: {
                        "score": -1
                    }
                }
            ])

        const userData = await UserModel.find({
            '_id': {
                $in: allSolutions.map(x => x._id)
            }
        }).select("_id username photo")

        const filtered = allSolutions.map(sol => {
            const user = userData.find(x => x._id.equals(sol._id))
            return {...user._doc, ...sol}
        })
        Result.success(res, "", filtered)
    } catch(err) {
        next(err)
    }
}

export {
    getHighScores,
    getHighScoreByTrack
}