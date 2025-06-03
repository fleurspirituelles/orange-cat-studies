import db from "../config/database.js";

const ExamModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM exams");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM exams WHERE id_exam = ?", [
      id,
    ]);
    return rows[0];
  },

  create: async ({ id_user, exam_name, board, level, year, position }) => {
    const [result] = await db.query(
      "INSERT INTO exams (id_user, exam_name, board, level, year, position) VALUES (?, ?, ?, ?, ?, ?)",
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

  update: async (id, { id_user, exam_name, board, level, year, position }) => {
    const [result] = await db.query(
      "UPDATE exams SET id_user = ?, exam_name = ?, board = ?, level = ?, year = ?, position = ? WHERE id_exam = ?",
      [id_user, exam_name, board, level, year, position, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_exam: id, id_user, exam_name, board, level, year, position };
  },

  remove: async (id) => {
    const [result] = await db.query("DELETE FROM exams WHERE id_exam = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default ExamModel;