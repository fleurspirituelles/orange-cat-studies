import db from "../config/database.js";

const ReviewModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM reviews");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM reviews WHERE id_review = ?", [
      id,
    ]);
    return rows[0];
  },

  create: async ({ id_user, id_question }) => {
    const [result] = await db.query(
      "INSERT INTO reviews (id_user, id_question) VALUES (?, ?)",
      [id_user, id_question]
    );
    return { id_review: result.insertId, id_user, id_question };
  },

  remove: async (id) => {
    const [result] = await db.query("DELETE FROM reviews WHERE id_review = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default ReviewModel;