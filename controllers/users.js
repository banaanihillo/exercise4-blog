const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.post("/", async (request, response) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    console.log(passwordHash)
    const user = new User({
        user: body.user,
        name: body.name,
        passwordHash
    })
    const newUser = await user.save()
    response.json(newUser)
})

userRouter.get("/", async (request, response) => {
    const users = await User.find({})
    console.log(request.originalUrl)
    response.json(users.map(user => {
        return user.toJSON()
    }))
})

module.exports = userRouter
