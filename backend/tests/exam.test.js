import request from "supertest";
import mysql from "mysql2/promise";
import app from "../server.js";

let server;
const API = () => request(server);

describe("Exam endpoints", () => {
  let db;
  let createdExamId;

  beforeAll(async () => {
    db = await mysql.createPool({
      host: "localhost",
      user: "root",
      password: "root",
      database: "purrfect_studies",
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
    });

    server = app.listen(0);
  });

  afterAll(async () => {
    await db.end();
    await new Promise((resolve) => server.close(resolve));
  });

  test("GET /exams should return all exams", async () => {
    const response = await API().get("/exams");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /exams should create a new exam", async () => {
    const newExam = {
      id_user: 1,
      exam_name: "Simulado TJ SP",
      board: "VUNESP",
      level: "Estadual",
      year: 2025,
      position: "Escrevente Técnico Judiciário",
    };

    const response = await API().post("/exams").send(newExam);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_exam");
    expect(response.body.exam_name).toBe(newExam.exam_name);
    createdExamId = response.body.id_exam;
  });

  test("GET /exams/:id should return a single exam", async () => {
    const response = await API().get(`/exams/${createdExamId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_exam", createdExamId);
  });

  test("PUT /exams/:id should update an exam", async () => {
    const updatedExam = {
      id_user: 1,
      exam_name: "Simulado TJ SP Atualizado",
      board: "FCC",
      level: "Federal",
      year: 2024,
      position: "Analista Judiciário",
    };

    const response = await API()
      .put(`/exams/${createdExamId}`)
      .send(updatedExam);
    expect(response.status).toBe(200);
    expect(response.body.exam_name).toBe(updatedExam.exam_name);
  });

  test("DELETE /exams/:id should delete an exam", async () => {
    const response = await API().delete(`/exams/${createdExamId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Exam deleted.");
  });

  test("GET /exams/:id with invalid ID should return 404", async () => {
    const response = await API().get("/exams/999999");
    expect(response.status).toBe(404);
  });

  test("PUT /exams/:id with invalid ID should return 404", async () => {
    const response = await API().put("/exams/999999").send({
      id_user: 1,
      exam_name: "Inexistente",
      board: "IDECAN",
      level: "Municipal",
      year: 2020,
      position: "Agente Administrativo",
    });
    expect(response.status).toBe(404);
  });

  test("DELETE /exams/:id with invalid ID should return 404", async () => {
    const response = await API().delete("/exams/999999");
    expect(response.status).toBe(404);
  });
});