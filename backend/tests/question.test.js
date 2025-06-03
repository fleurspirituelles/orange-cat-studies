import request from "supertest";
import app from "../server.js";

let server;
const API = () => request(server);

describe("Question endpoints", () => {
  let createdQuestionId;
  let id_exam = 1;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /questions should return all questions", async () => {
    const response = await API().get("/questions");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /questions should create a new question", async () => {
    const newQuestion = {
      id_exam,
      statement: "Quanto é 2 + 2?",
      answer_key: "A",
    };

    const response = await API().post("/questions").send(newQuestion);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_question");
    expect(response.body.statement).toBe(newQuestion.statement);
    createdQuestionId = response.body.id_question;
  });

  test("GET /questions/:id should return a specific question", async () => {
    const response = await API().get(`/questions/${createdQuestionId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_question", createdQuestionId);
  });

  test("PUT /questions/:id should update a question", async () => {
    const updatedQuestion = {
      id_exam,
      statement: "Quanto é 5 + 5?",
      answer_key: "B",
    };

    const response = await API()
      .put(`/questions/${createdQuestionId}`)
      .send(updatedQuestion);
    expect(response.status).toBe(200);
    expect(response.body.statement).toBe(updatedQuestion.statement);
  });

  test("DELETE /questions/:id should delete a question", async () => {
    const response = await API().delete(`/questions/${createdQuestionId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Question deleted");
  });

  test("GET /questions/:id with invalid ID should return 404", async () => {
    const response = await API().get("/questions/999999");
    expect(response.status).toBe(404);
  });

  test("PUT /questions/:id with invalid ID should return 404", async () => {
    const response = await API().put("/questions/999999").send({
      id_exam,
      statement: "Teste inválido",
      answer_key: "C",
    });
    expect(response.status).toBe(404);
  });

  test("DELETE /questions/:id with invalid ID should return 404", async () => {
    const response = await API().delete("/questions/999999");
    expect(response.status).toBe(404);
  });
});