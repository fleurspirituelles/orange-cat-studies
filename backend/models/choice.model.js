import connection from "../config/database.js";

const Choice = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM choices");
    return rows;
  },

  getById: async (id_choice) => {
    const [rows] = await connection.execute(
      "SELECT * FROM choices WHERE id_choice = ?",
      [id_choice]
    );
    return rows[0];
  },

  getByQuestion: async (id_question) => {
    const [rows] = await connection.execute(
      "SELECT * FROM choices WHERE id_question = ?",
      [id_question]
    );
    return rows;
  },

  create: async (choice) => {
    const { id_question, letter, description } = choice;
    const [result] = await connection.execute(
      "INSERT INTO choices (id_question, letter, description) VALUES (?, ?, ?)",
      [id_question, letter, description]
    );
    return { id_choice: result.insertId, ...choice };
  },

  remove: async (id_choice) => {
    const [result] = await connection.execute(
      "DELETE FROM choices WHERE id_choice = ?",
      [id_choice]
    );
    return result.affectedRows > 0;
  },
};

export default Choice;