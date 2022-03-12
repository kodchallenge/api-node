import mongoose from "mongoose";
const localUrl = `mongodb://localhost:27017/kodchallenge`

mongoose.connect(process.env.CONNECTION_URL || localUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connect to database")
}).catch((err) => {
    console.error("Not connected to database", err)
})