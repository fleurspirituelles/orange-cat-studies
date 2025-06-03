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

  create: async ({ id_exam, statement, answer_key }) => {
    const [result] = await db.query(
      "INSERT INTO questions (id_exam, statement, answer_key) VALUES (?, ?, ?)",
      [id_exam, statement, answer_key]
    );
    return { id_question: result.insertId, id_exam, statement, answer_key };
  },

  update: async (id, { id_exam, statement, answer_key }) => {
    const [result] = await db.query(
      "UPDATE questions SET id_exam = ?, statement = ?, answer_key = ? WHERE id_question = ?",
      [id_exam, statement, answer_key, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_question: id, id_exam, statement, answer_key };
  },

  remove: async (id) => {
    const [result] = await db.query(
      "DELETE FROM questions WHERE id_question = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

export default QuestionModel;