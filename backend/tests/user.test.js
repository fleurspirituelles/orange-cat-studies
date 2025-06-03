
import request from "supertest";
import mysql from "mysql2/promise";
import app from "../server.js";

const API = request(app);

describe("User endpoints", () => {
  let db;
  let createdUserId;

  beforeAll(async () => {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "purrfect_studies",
    });
  });

  afterAll(async () => {
    await db.end();
  });

  test("GET /users should return all users", async () => {
    const response = await API.get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /users should create a new user", async () => {
    const newUser = {
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "securepass123",
    };

    const response = await API.post("/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_user");
    expect(response.body.name).toBe(newUser.name);

    createdUserId = response.body.id_user;
  });

  test("PUT /users/:id should update a user", async () => {
    const updatedUser = {
      name: "Updated Name",
      email: `updated${Date.now()}@example.com`,
      password: "updatedPass",
    };

    const response = await API.put(`/users/${createdUserId}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
  });

  test("DELETE /users/:id should delete a user", async () => {
    const response = await API.delete(`/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "User deleted");
  });

  test("DELETE /users/:id with non-existent ID should return 404", async () => {
    const response = await API.delete(`/users/999999`);
    expect(response.status).toBe(404);
  });

  test("PUT /users/:id with non-existent ID should return 404", async () => {
    const updatedUser = {
      name: "Nobody",
      email: "nobody@example.com",
      password: "none",
    };

    const response = await API.put(`/users/999999`).send(updatedUser);
    expect(response.status).toBe(404);
  });
});
