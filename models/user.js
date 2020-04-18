const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    user: {type: String, required: true, minlength: 3, unique: true},
    name: String,
    passwordHash: {type: String, required: true}
})
userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (document, userToFormat) => {
        userToFormat.id = userToFormat._id.toString()
        delete userToFormat._id
        delete userToFormat.__v
        delete userToFormat.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema)
