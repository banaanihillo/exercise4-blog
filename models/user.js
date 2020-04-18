const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user: String,
    name: String,
    password: String
})

userSchema.set("toJSON", {
    transform: (document, blogToFormat) => {
        blogToFormat.id = blogToFormat._id.toString()
        delete blogToFormat._id
        delete blogToFormat.__v
    }
})

module.exports = mongoose.model("User", userSchema)
