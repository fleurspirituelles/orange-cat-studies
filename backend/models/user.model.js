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

  create: async (user) => {
    const { id_user, name, email, password } = user;
    await connection.execute(
      "INSERT INTO users (id_user, name, email, password, created_at) VALUES (?, ?, ?, ?, NOW())",
      [id_user, name, email, password]
    );
    return { id_user, name, email, password };
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