import request from "supertest";
import app from "../server.js";

let server;
const API = () => request(server);

describe("Choice endpoints", () => {
  let createdChoiceId;
  let createdQuestionId;

  beforeAll(async () => {
    server = app.listen(0);

    const newQuestion = {
      id_exam: 1,
      statement: "Qual é a capital do Brasil?",
      answer_key: "A",
    };

    const response = await API().post("/questions").send(newQuestion);
    createdQuestionId = response.body.id_question;
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /choices should return all choices", async () => {
    const response = await API().get("/choices");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /choices should create a new choice", async () => {
    const newChoice = {
      id_question: createdQuestionId,
      description: "Brasília",
      letter: "A",
    };

    const response = await API().post("/choices").send(newChoice);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_choice");
    expect(response.body.description).toBe(newChoice.description);
    createdChoiceId = response.body.id_choice;
  });

  test("GET /choices/:id should return a specific choice", async () => {
    const response = await API().get(`/choices/${createdChoiceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_choice", createdChoiceId);
  });

  test("PUT /choices/:id should update a choice", async () => {
    const updatedChoice = {
      id_question: createdQuestionId,
      description: "Rio de Janeiro",
      letter: "B",
    };

    const response = await API()
      .put(`/choices/${createdChoiceId}`)
      .send(updatedChoice);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe(updatedChoice.description);
  });

  test("DELETE /choices/:id should delete a choice", async () => {
    const response = await API().delete(`/choices/${createdChoiceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Choice deleted");
  });

  test("GET /choices/:id with invalid ID should return 404", async () => {
    const response = await API().get("/choices/999999");
    expect(response.status).toBe(404);
  });

  test("PUT /choices/:id with invalid ID should return 404", async () => {
    const response = await API().put("/choices/999999").send({
      id_question: createdQuestionId,
      description: "Invalid",
      letter: "C",
    });
    expect(response.status).toBe(404);
  });

  test("DELETE /choices/:id with invalid ID should return 404", async () => {
    const response = await API().delete("/choices/999999");
    expect(response.status).toBe(404);
  });
});