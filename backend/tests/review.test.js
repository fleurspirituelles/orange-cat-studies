import request from "supertest";
import app from "../server.js";

let server;
const API = () => request(server);

describe("Review endpoints", () => {
  let createdReviewId;
  let createdQuestionId;
  let id_user = 1;

  beforeAll(async () => {
    server = app.listen(0);

    const question = {
      id_exam: 1,
      statement: "Questão para revisão",
      answer_key: "A",
    };

    const response = await API().post("/questions").send(question);
    createdQuestionId = response.body.id_question;
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /reviews should return all reviews", async () => {
    const response = await API().get("/reviews");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /reviews should create a new review", async () => {
    const review = {
      id_user,
      id_question: createdQuestionId,
    };

    const response = await API().post("/reviews").send(review);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_review");
    createdReviewId = response.body.id_review;
  });

  test("GET /reviews/:id should return a specific review", async () => {
    const response = await API().get(`/reviews/${createdReviewId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_review", createdReviewId);
  });

  test("DELETE /reviews/:id should delete a review", async () => {
    const response = await API().delete(`/reviews/${createdReviewId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Review deleted");
  });

  test("GET /reviews/:id with invalid ID should return 404", async () => {
    const response = await API().get("/reviews/999999");
    expect(response.status).toBe(404);
  });

  test("DELETE /reviews/:id with invalid ID should return 404", async () => {
    const response = await API().delete("/reviews/999999");
    expect(response.status).toBe(404);
  });
});