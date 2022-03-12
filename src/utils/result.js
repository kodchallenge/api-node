export default class Result {
    static success(res, message="", data=null) {
        res.status(200).json({
            success: true,
            message: message,
            data: data,
        })
    }

    static error(res, message = "", errorCode=400) {
        res.status(errorCode).json({
            success: false,
            message: message
        })
    }

    static notFound(res) {
        res.status(404).json({
            succes: false,
            message: "API endpoint not found"
        })
    }
}