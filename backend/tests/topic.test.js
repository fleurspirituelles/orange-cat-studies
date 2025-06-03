
import request from "supertest";
import app from "../server.js";

let server;
const API = () => request(server);

describe("Topic endpoints", () => {
  let createdTopicId;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /topics should return all topics", async () => {
    const response = await API().get("/topics");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /topics should create a new topic", async () => {
    const newTopic = {
      name: "Raciocínio Lógico"
    };

    const response = await API().post("/topics").send(newTopic);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_topic");
    expect(response.body.name).toBe(newTopic.name);
    createdTopicId = response.body.id_topic;
  });

  test("GET /topics/:id should return a specific topic", async () => {
    const response = await API().get(`/topics/${createdTopicId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_topic", createdTopicId);
  });

  test("PUT /topics/:id should update a topic", async () => {
    const updatedTopic = {
      name: "Matemática Básica"
    };

    const response = await API().put(`/topics/${createdTopicId}`).send(updatedTopic);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedTopic.name);
  });

  test("DELETE /topics/:id should delete a topic", async () => {
    const response = await API().delete(`/topics/${createdTopicId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Topic deleted");
  });

  test("GET /topics/:id with invalid ID should return 404", async () => {
    const response = await API().get("/topics/999999");
    expect(response.status).toBe(404);
  });

  test("PUT /topics/:id with invalid ID should return 404", async () => {
    const response = await API().put("/topics/999999").send({ name: "Estatística" });
    expect(response.status).toBe(404);
  });

  test("DELETE /topics/:id with invalid ID should return 404", async () => {
    const response = await API().delete("/topics/999999");
    expect(response.status).toBe(404);
  });
});
