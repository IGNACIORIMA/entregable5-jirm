require('../models')

const request = require('supertest')
const app = require('../app')

let movieId

const BASE_URL = '/api/v1/movies'

const movie = {
    name: "Batman: The dark knight",
    image: "https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg",
    synopsis: "Con la ayuda del teniente Jim Gordon y del Fiscal del Distrito Harvey Dent, Batman mantiene a raya el crimen organizado en Gotham. Todo cambia cuando aparece el Joker, un nuevo criminal que desencadena el caos y tiene aterrados a los ciudadanos.",
    releaseYear: "2008-07-20"
}

// 1. C -> Create
test("POST -> BASE_URL, should return statusCode 201, and res.body.name === movie.name", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id
    console.log(res.body)
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
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
test("GET -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movie.name", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

// 4. U -> Update
test("UPDATE -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movieUpdate.name", async() => {
    const movieUpdate = {
        name : "The dark knight"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
});

// 5. D -> Delete
test("DELETE -> BASE_URL/movieId, should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
});