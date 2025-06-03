import db from "../config/database.js";

const TopicModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM topics");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM topics WHERE id_topic = ?", [
      id,
    ]);
    return rows[0];
  },

  create: async ({ name }) => {
    const [result] = await db.query("INSERT INTO topics (name) VALUES (?)", [
      name,
    ]);
    return { id_topic: result.insertId, name };
  },

  update: async (id, { name }) => {
    const [result] = await db.query(
      "UPDATE topics SET name = ? WHERE id_topic = ?",
      [name, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_topic: id, name };
  },

  remove: async (id) => {
    const [result] = await db.query("DELETE FROM topics WHERE id_topic = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default TopicModel;