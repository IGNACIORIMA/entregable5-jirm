const request = require("supertest");
const app = require('../app')

let directorId

const BASE_URL = '/api/v1/directors'

const director = {
    firstName: "Cristopher",
    lastName: "Nolan",
    nationality: "British",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Christopher_Nolan_Cannes_2018.jpg/330px-Christopher_Nolan_Cannes_2018.jpg",
    birthday: "1970-07-30"
}

// 1. C -> Create
test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === director.firstName", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
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
test("GET -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === director.firstName", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

// 4. U -> Update
test("UPDATE -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === directorUpdate.firstName", async() => {
    const directorUpdate = {
        firstName : "Christopher"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
});

// 5. D -> Delete
test("DELETE -> BASE_URL/directorId, should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
});