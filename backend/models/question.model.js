import db from "../config/database.js";

const QuestionModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM questions");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM questions WHERE id_question = ?",
      [id]
    );
    return rows[0];
  },

  create: async (question) => {
    const { id_exam, statement, answer_key } = question;
    const [result] = await db.query(
      "INSERT INTO questions (id_exam, statement, answer_key) VALUES (?, ?, ?)",
      [id_exam, statement, answer_key]
    );
    return { id_question: result.insertId, ...question };
  },

  update: async (id, question) => {
    const { id_exam, statement, answer_key } = question;
    await db.query(
      "UPDATE questions SET id_exam = ?, statement = ?, answer_key = ? WHERE id_question = ?",
      [id_exam, statement, answer_key, id]
    );
    return { id_question: id, ...question };
  },

  remove: async (id) => {
    await db.query("DELETE FROM questions WHERE id_question = ?", [id]);
    return { message: "Question deleted" };
  },
};

export default QuestionModel;