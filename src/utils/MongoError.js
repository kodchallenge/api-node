class MongoError {
    static unique(err, key) {
        return err.keyValue[key] && err.code === 11000
    }
}

export default MongoError