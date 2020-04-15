const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blog = supertest(app)
const Blog = require("../models/blog")


const blogsForTesting = [
    {
        title: "Not Sure If This Blog Really Exists",
        author: "Absolutely No Idea",
        url: "/error.html",
        thanks: 4
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObject = new Blog(blogsForTesting[0])
    await blogObject.save()
})

test("The test displays the correct amount of blogs", async () => {
    const response = await blog.get("/api/blogs")
    expect(response.body).toHaveLength(1)
})

test("The blogs are in JSON format", async () => {
    await blog
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("The blog id is in a suitable format", async () => {
    const response = await blog.get("/api/blogs")
    expect(response.body.id).toBeDefined
})

test("Adding new blogs works", async () => {
    const newBlog = {
        title: "How to Add New Entries",
        author: "New Author",
        url: "/yep",
        thanks: 0
    }

    await blog
        .post("/api/blogs")
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    const response = await blog.get("/api/blogs")
    expect(response.body).toHaveLength(blogsForTesting.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})
