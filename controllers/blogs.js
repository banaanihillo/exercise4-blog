const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", {user: 1, name: 1, id: 1})
    console.log(request.originalUrl)
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post("/", async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).end()
    }
    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        thanks: body.thanks || 0,
        user: user.id
    })

    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog.id)
    await user.save()
    response.json(newBlog.toJSON())
})

blogRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        thanks: body.thanks
    }
    const modifiedBlog = await Blog.findByIdAndUpdate(
        request.params.id, blog, {new: true})
    response.json(modifiedBlog.toJSON())
})

module.exports = blogRouter
