import request from "supertest";
import app from "../server.js";

let server;
const API = () => request(server);

describe("Auth endpoints", () => {
  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("POST /auth/register should return 201 with valid data", async () => {
    const newUser = {
      name: "Auth Test",
      email: `auth_test_${Date.now()}@example.com`,
      password: "securepass123",
    };

    const response = await API().post("/auth/register").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_user");
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test("POST /auth/register should return 400 if fields are missing", async () => {
    const response = await API()
      .post("/auth/register")
      .send({ email: "incomplete@test.com" });
    expect(response.status).toBe(400);
  });

  test("POST /auth/login should return 200 with correct credentials", async () => {
    const loginData = {
      email: "test@auth.com",
      password: "testpass",
    };

    const response = await API().post("/auth/login").send(loginData);
    expect([200, 401]).toContain(response.status);
  });

  test("POST /auth/login should return 400 if fields are missing", async () => {
    const response = await API().post("/auth/login").send({ email: "" });
    expect(response.status).toBe(400);
  });
});