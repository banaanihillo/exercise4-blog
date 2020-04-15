const router = require("express").Router()
const Blog = require("../models/blog")

router.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

router.post("/", async (request, response) => {
    const body = request.body


    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        thanks: body.thanks
    })

    const newBlog = await blog.save()
    response.json(newBlog.toJSON())
})

module.exports = router
