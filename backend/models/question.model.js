import connection from "../config/database.js";

const Question = {
  getAll: async () => {
    const [rows] = await connection.execute(`
      SELECT
        q.id_question,
        q.id_exam,
        q.statement,
        q.answer_key,
        e.exam_name,
        e.board,
        e.year,
        c.letter,
        c.description
      FROM questions q
      JOIN choices c ON c.id_question = q.id_question
      JOIN exams e ON q.id_exam = e.id_exam
      ORDER BY q.id_question, c.letter
    `);
    const map = {};
    for (const row of rows) {
      if (!map[row.id_question]) {
        map[row.id_question] = {
          id_question: row.id_question,
          id_exam: row.id_exam,
          statement: row.statement,
          answer_key: row.answer_key,
          exam_name: row.exam_name,
          board: row.board,
          year: row.year,
          choices: [],
        };
      }
      map[row.id_question].choices.push({
        letter: row.letter,
        description: row.description,
      });
    }
    return Object.values(map);
  },

  getById: async (id_question) => {
    const [rows] = await connection.execute(
      "SELECT * FROM questions WHERE id_question = ?",
      [id_question]
    );
    return rows[0];
  },

  create: async (question) => {
    const { id_exam, statement, answer_key } = question;
    const [result] = await connection.execute(
      "INSERT INTO questions (id_exam, statement, answer_key) VALUES (?, ?, ?)",
      [id_exam, statement, answer_key]
    );
    return { id_question: result.insertId, ...question };
  },

  update: async (id_question, question) => {
    const { id_exam, statement, answer_key } = question;
    const [result] = await connection.execute(
      "UPDATE questions SET id_exam = ?, statement = ?, answer_key = ? WHERE id_question = ?",
      [id_exam, statement, answer_key, id_question]
    );
    return result.affectedRows > 0;
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