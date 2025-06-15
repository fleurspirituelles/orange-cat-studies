import connection from "../config/database.js";

const User = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM users");
    return rows;
  },

  getById: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id_user = ?",
      [id_user]
    );
    return rows[0];
  },

  getByEmail: async (email) => {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  getByUID: async (uid) => {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE uid = ?",
      [uid]
    );
    return rows[0];
  },

  create: async (user) => {
    const { uid, name, email } = user;
    const [result] = await connection.execute(
      "INSERT INTO users (uid, name, email, created_at) VALUES (?, ?, ?, NOW())",
      [uid, name, email]
    );
    return {
      id_user: result.insertId,
      uid,
      name,
      email,
    };
  },

  remove: async (id_user) => {
    const [result] = await connection.execute(
      "DELETE FROM users WHERE id_user = ?",
      [id_user]
    );
    return result.affectedRows > 0;
  },
};

export default User;