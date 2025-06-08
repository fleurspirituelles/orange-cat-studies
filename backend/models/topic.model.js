import connection from "../config/database.js";

const Topic = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM topics");
    return rows;
  },

  getById: async (id_topic) => {
    const [rows] = await connection.execute(
      "SELECT * FROM topics WHERE id_topic = ?",
      [id_topic]
    );
    return rows[0];
  },

  getByName: async (name) => {
    const [rows] = await connection.execute(
      "SELECT * FROM topics WHERE name = ?",
      [name]
    );
    return rows[0];
  },

  create: async (name) => {
    const [result] = await connection.execute(
      "INSERT INTO topics (name) VALUES (?)",
      [name]
    );
    return { id_topic: result.insertId, name };
  },

  remove: async (id_topic) => {
    const [result] = await connection.execute(
      "DELETE FROM topics WHERE id_topic = ?",
      [id_topic]
    );
    return result.affectedRows > 0;
  },
};

export default Topic;