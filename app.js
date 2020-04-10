const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const address = process.env.MONGODB_URI
mongoose.connect(address, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Successfully connected to Mongo")
    })
    .catch((error) => {
        console.log(`Could not connect to Mongo: ${error}`)
    })

app.use(cors())
app.use(express.json())
const router = require("./controllers/blogs")
app.use("/api/blogs", router)
module.exports = app
