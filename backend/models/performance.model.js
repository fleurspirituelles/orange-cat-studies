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
    return rows[0];
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM performance WHERE id_user = ?",
      [id_user]
    );
    return rows;
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

  remove: async (id_performance) => {
    const [result] = await connection.execute(
      "DELETE FROM performance WHERE id_performance = ?",
      [id_performance]
    );
    return result.affectedRows > 0;
  },
};

export default Performance;