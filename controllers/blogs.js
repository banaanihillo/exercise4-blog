const router = require("express").Router()
const Blog = require("../models/blog")

router.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

router.post("/", async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        thanks: body.thanks || 0
    })

    const newBlog = await blog.save()
    response.json(newBlog.toJSON())
})

router.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

router.put("/:id", async (request, response) => {
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

module.exports = router
