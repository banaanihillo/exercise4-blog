const tokenGenerator = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (request, response) => {
    const body = request.body
    const user = await User.findOne({user: body.user})
    const authorized = (user === null)
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!authorized || !user) {
        return response.status(401).json({error: "Incorrect login info"})
    }
    const kolikko = {
        user: user.user,
        ud: user.id
    }
    const token = tokenGenerator.sign(kolikko, process.env.SECRET)
    response
        .status(200)
        .send({token, user: user.user, name: user.name})
})

module.exports = loginRouter
