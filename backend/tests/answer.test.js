import request from "supertest";
import app from "../server.js";

let server;
const API = () => request(server);

describe("Answer endpoints", () => {
  let createdAnswerId;
  let createdQuestionId;
  const id_user = 1;

  beforeAll(async () => {
    server = app.listen(0);

    const question = {
      id_exam: 1,
      statement: "Questão para teste de resposta",
      answer_key: "C",
    };

    const response = await API().post("/questions").send(question);
    createdQuestionId = response.body.id_question;
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /answers should return all answers", async () => {
    const response = await API().get("/answers");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /answers should create a new answer", async () => {
    const newAnswer = {
      id_user,
      id_question: createdQuestionId,
      selected_choice: "C",
    };

    const response = await API().post("/answers").send(newAnswer);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_answer");
    expect(response.body.selected_choice).toBe("C");
    createdAnswerId = response.body.id_answer;
  });

  test("GET /answers/:id should return a specific answer", async () => {
    const response = await API().get(`/answers/${createdAnswerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_answer", createdAnswerId);
  });

  test("PUT /answers/:id should update an answer", async () => {
    const updated = {
      id_user,
      id_question: createdQuestionId,
      selected_choice: "B",
    };

    const response = await API()
      .put(`/answers/${createdAnswerId}`)
      .send(updated);
    expect(response.status).toBe(200);
    expect(response.body.selected_choice).toBe("B");
  });

  test("DELETE /answers/:id should delete an answer", async () => {
    const response = await API().delete(`/answers/${createdAnswerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Answer deleted");
  });

  test("GET /answers/:id with invalid ID should return 404", async () => {
    const response = await API().get("/answers/999999");
    expect(response.status).toBe(404);
  });

  test("PUT /answers/:id with invalid ID should return 404", async () => {
    const response = await API().put("/answers/999999").send({
      id_user,
      id_question: createdQuestionId,
      selected_choice: "D",
    });
    expect(response.status).toBe(404);
  });

  test("DELETE /answers/:id with invalid ID should return 404", async () => {
    const response = await API().delete("/answers/999999");
    expect(response.status).toBe(404);
  });
});