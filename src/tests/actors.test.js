const request = require("supertest");
const app = require('../app')

let actorId

const BASE_URL = '/api/v1/actors'

const actor = {
    firstName: "Christian",
    lastName: "Bale",
    nationality: "British",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Christian_Bale-7837.jpg/330px-Christian_Bale-7837.jpg",
    birthday: "1974-01-30"
}

// 1. C -> Create
test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === actor.firstName", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
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
test("GET -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === actor.firstName", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

// 4. U -> Update
test("UPDATE -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === actorUpdate.firstName", async() => {
    const actorUpdate = {
        firstName : "Cristian"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

// 5. D -> Delete
test("DELETE -> BASE_URL/actorId, should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
});