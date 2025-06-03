import db from "../config/database.js";

const UserModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id_user = ?", [
      id,
    ]);
    return rows[0];
  },

  create: async ({ name, email, password }) => {
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return { id_user: result.insertId, name, email };
  },

  update: async (id, { name, email, password }) => {
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id_user = ?",
      [name, email, password, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_user: id, name, email };
  },

  remove: async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id_user = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default UserModel;