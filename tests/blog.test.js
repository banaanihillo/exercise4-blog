const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blog = supertest(app)

test("The test displays the correct amount of blogs", async () => {
    const response = await blog.get("/api/blogs")
    expect(response.body).toHaveLength(13)
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

afterAll(() => {
    mongoose.connection.close()
})
