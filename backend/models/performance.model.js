import connection from "../config/database.js";

const Performance = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM performance");
    return rows;
  },

  getById: async (id_performance) => {
    const [rows] = await connection.execute(
      "SELECT * FROM performance WHERE id_performance = ?",
      [id_performance]
    );
    return rows[0] || null;
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM performance WHERE id_user = ?",
      [id_user]
    );
    return rows;
  },

  getByPeriod: async (id_user, start_date, end_date) => {
    const [rows] = await connection.execute(
      "SELECT * FROM performance WHERE id_user = ? AND start_date = ? AND end_date = ?",
      [id_user, start_date, end_date]
    );
    return rows[0] || null;
  },

  create: async (data) => {
    const { id_user, start_date, end_date, question_count, correct_count } =
      data;
    const [result] = await connection.execute(
      "INSERT INTO performance (id_user, start_date, end_date, question_count, correct_count) VALUES (?, ?, ?, ?, ?)",
      [id_user, start_date, end_date, question_count, correct_count]
    );
    return { id_performance: result.insertId, ...data };
  },

  update: async (id_performance, data) => {
    const { question_count, correct_count } = data;
    const [result] = await connection.execute(
      "UPDATE performance SET question_count = ?, correct_count = ? WHERE id_performance = ?",
      [question_count, correct_count, id_performance]
    );
    return result.affectedRows > 0;
  },

  remove: async (id_performance) => {
    const [result] = await connection.execute(
      "DELETE FROM performance WHERE id_performance = ?",
      [id_performance]
    );
    return result.affectedRows > 0;
  },

  getFromComics: async (id_user, start_date, end_date) => {
    const [rows] = await connection.execute(
      `SELECT COALESCE(SUM(answered_count),0) AS correct_count
       FROM comics
       WHERE id_user = ? AND comic_date BETWEEN ? AND ?`,
      [id_user, start_date, end_date]
    );

    const correct_count = rows[0].correct_count ?? 0;

    const [daysRows] = await connection.execute(
      `SELECT DATEDIFF(?, ?) + 1 AS days`,
      [end_date, start_date]
    );

    const days = daysRows[0].days ?? 0;
    const question_count = days * 10;

    return {
      question_count,
      correct_count,
    };
  },
};

export default Performance;