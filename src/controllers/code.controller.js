import axios from "axios"
import Result from "../utils/Result.js"
const runCode = async (req, res, next) => {
    const code = req.body

    axios.post(process.env.CODE_COMPILER_URL, code)
        .then((response) => {
            Result.success(res, "Code compiled", response.data)
        })
        .catch((err) => {
            console.log(err)
            res.json({err})
        })
}

export {
    runCode
}