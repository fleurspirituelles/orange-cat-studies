import db from "../config/database.js";

const ChoiceModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM choices");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM choices WHERE id_choice = ?", [
      id,
    ]);
    return rows[0];
  },

  create: async ({ id_question, description, letter }) => {
    const [result] = await db.query(
      "INSERT INTO choices (id_question, description, letter) VALUES (?, ?, ?)",
      [id_question, description, letter]
    );
    return { id_choice: result.insertId, id_question, description, letter };
  },

  update: async (id, { id_question, description, letter }) => {
    const [result] = await db.query(
      "UPDATE choices SET id_question = ?, description = ?, letter = ? WHERE id_choice = ?",
      [id_question, description, letter, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_choice: id, id_question, description, letter };
  },

  remove: async (id) => {
    const [result] = await db.query("DELETE FROM choices WHERE id_choice = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default ChoiceModel;