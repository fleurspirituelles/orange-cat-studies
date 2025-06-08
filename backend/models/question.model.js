import connection from "../config/database.js";

const Question = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM questions");
    return rows;
  },

  getById: async (id_question) => {
    const [rows] = await connection.execute(
      "SELECT * FROM questions WHERE id_question = ?",
      [id_question]
    );
    return rows[0];
  },

  getByExam: async (id_exam) => {
    const [rows] = await connection.execute(
      "SELECT * FROM questions WHERE id_exam = ?",
      [id_exam]
    );
    return rows;
  },

  create: async (question) => {
    const { id_exam, statement, answer_key } = question;
    const [result] = await connection.execute(
      "INSERT INTO questions (id_exam, statement, answer_key) VALUES (?, ?, ?)",
      [id_exam, statement, answer_key]
    );
    return { id_question: result.insertId, ...question };
  },

  remove: async (id_question) => {
    const [result] = await connection.execute(
      "DELETE FROM questions WHERE id_question = ?",
      [id_question]
    );
    return result.affectedRows > 0;
  },
};

export default Question;