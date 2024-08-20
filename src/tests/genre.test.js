const request = require("supertest");
const app = require('../app')

let genreId

const BASE_URL = '/api/v1/genres'

const genre = {
    name: "Action"
}

// 1. C -> Create
test("POST -> BASE_URL, should return statusCode 201, and res.body.name === genre.name", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

// 2. R -> GetAll
test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

// 3. R -> GetOne
test("GET -> BASE_URL/genreid, should return statusCode 200, and res.body.name === genre.name", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${genreId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

// 4. U -> Update
test("UPDATE -> BASE_URL/genreId, should return statusCode 200, and res.body.name === genreUpdate.name", async() => {
    const genreUpdate = {
        name : "Action-Thriller"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
});

// 5. D -> Delete
test("DELETE -> BASE_URL/genreId, should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
});