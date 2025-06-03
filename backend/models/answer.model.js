import db from "../config/database.js";

const AnswerModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM answers");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM answers WHERE id_answer = ?", [
      id,
    ]);
    return rows[0];
  },

  create: async ({ id_user, id_question, selected_choice }) => {
    const [result] = await db.query(
      "INSERT INTO answers (id_user, id_question, selected_choice) VALUES (?, ?, ?)",
      [id_user, id_question, selected_choice]
    );
    return {
      id_answer: result.insertId,
      id_user,
      id_question,
      selected_choice,
    };
  },

  update: async (id, { id_user, id_question, selected_choice }) => {
    const [result] = await db.query(
      "UPDATE answers SET id_user = ?, id_question = ?, selected_choice = ? WHERE id_answer = ?",
      [id_user, id_question, selected_choice, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_answer: id, id_user, id_question, selected_choice };
  },

  remove: async (id) => {
    const [result] = await db.query("DELETE FROM answers WHERE id_answer = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default AnswerModel;