import connection from "../config/database.js";

const Review = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM reviews");
    return rows;
  },

  getById: async (id_review) => {
    const [rows] = await connection.execute(
      "SELECT * FROM reviews WHERE id_review = ?",
      [id_review]
    );
    return rows[0];
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM reviews WHERE id_user = ?",
      [id_user]
    );
    return rows;
  },

  create: async ({ id_user, id_question }) => {
    const [result] = await connection.execute(
      "INSERT INTO reviews (id_user, id_question, marked_at) VALUES (?, ?, NOW())",
      [id_user, id_question]
    );
    return { id_review: result.insertId, id_user, id_question };
  },

  remove: async (id_review) => {
    const [result] = await connection.execute(
      "DELETE FROM reviews WHERE id_review = ?",
      [id_review]
    );
    return result.affectedRows > 0;
  },
};

export default Review;