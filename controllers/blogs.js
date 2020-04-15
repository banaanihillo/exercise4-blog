const router = require("express").Router()
const Blog = require("../models/blog")

router.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog =>
        blog.toJSON()
    ))
})

router.post("/", (request, response) => {
    const body = request.body
    console.log(body)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        thanks: body.thanks
    })

    blog.save()
        .then(newBlog => {
            response.json(newBlog.toJSON())
        })
        .catch(error =>
            console.log(error)
        )
})

module.exports = router
