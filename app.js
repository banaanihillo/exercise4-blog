const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const address = process.env.MONGODB_URI
async function connectToMongo() {
    mongoose.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}
connectToMongo().catch((error) => {
    console.log(`Could not connect to Mongo: ${error}`)
})

app.use(cors())
app.use(express.json())
const blogRouter = require("./controllers/blogs")
app.use("/api/blogs", blogRouter)
const userRouter = require("./controllers/users")
app.use("/api/users", userRouter)
const loginRouter = require("./controllers/login")
app.use("/api/login", loginRouter)
module.exports = app
