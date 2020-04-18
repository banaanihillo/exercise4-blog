const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const address = /*(process.env.NODE_ENV === "test")
    ? process.env.TEST_MONGODB_URI
    : */process.env.MONGODB_URI
mongoose.connect(
    address, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
)
    .then(() => {
        console.log("Successfully connected to Mongo")
    })
    .catch((error) => {
        console.log(`Could not connect to Mongo: ${error}`)
    })

app.use(cors())
app.use(express.json())
const blogRouter = require("./controllers/blogs")
app.use("/api/blogs", blogRouter)
const userRouter = require("./controllers/users")
app.use("/api/users", userRouter)
module.exports = app
