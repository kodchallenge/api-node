import Result from "../utils/result.js"

const handlingError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    
    //Mongodb unique error
    if(err.code === 11000) {
        console.log(err)
        Result.error(res, `${Object.keys(err.keyValue)} zaten kullanımda.`)
    }

    Result.error(res, message, statusCode)
}


export {
    handlingError
}