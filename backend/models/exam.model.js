import connection from "../config/database.js";

const Exam = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM exams");
    return rows;
  },

  getById: async (id_exam) => {
    const [rows] = await connection.execute(
      "SELECT * FROM exams WHERE id_exam = ?",
      [id_exam]
    );
    return rows[0];
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM exams WHERE id_user = ? ORDER BY created_at DESC",
      [id_user]
    );
    return rows;
  },

  create: async ({ id_user, exam_name, year, board, position, level }) => {
    const [result] = await connection.execute(
      "INSERT INTO exams (id_user, exam_name, board, level, year, position, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [id_user, exam_name, board, level, year, position]
    );
    return {
      id_exam: result.insertId,
      id_user,
      exam_name,
      board,
      level,
      year,
      position,
    };
  },

  update: async (id_exam, exam) => {
    const { exam_name, board, level, year, position } = exam;
    const [result] = await connection.execute(
      "UPDATE exams SET exam_name = ?, board = ?, level = ?, year = ?, position = ? WHERE id_exam = ?",
      [exam_name, board, level, year, position, id_exam]
    );
    return result.affectedRows > 0;
  },

  remove: async (id_exam) => {
    const [result] = await connection.execute(
      "DELETE FROM exams WHERE id_exam = ?",
      [id_exam]
    );
    return result.affectedRows > 0;
  },
};

export default Exam;