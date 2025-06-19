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

  getMergedPerformance: async (id_user, start_date, end_date) => {
    const dbPerf = await Performance.getByPeriod(id_user, start_date, end_date);
    if (dbPerf) {
      return {
        question_count: dbPerf.question_count,
        correct_count: dbPerf.correct_count,
      };
    }

    const [rows] = await connection.execute(
      `SELECT SUM(answered_count) AS total FROM comics WHERE id_user = ? AND comic_date BETWEEN ? AND ?`,
      [id_user, start_date, end_date]
    );

    const question_count = rows[0].total || 0;
    return {
      question_count,
      correct_count: 0,
    };
  },
};

export default Performance;