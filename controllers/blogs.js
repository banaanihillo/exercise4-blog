const router = require("express").Router()
const Blog = require("../models/blog")

router.get("/", (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs.map(blog =>
                blog.toJSON()
            ))
        })
        .catch(error =>
            console.log(error)
        )
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
