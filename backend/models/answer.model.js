import connection from "../config/database.js";

const Answer = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM answers");
    return rows;
  },

  getById: async (id_answer) => {
    const [rows] = await connection.execute(
      "SELECT * FROM answers WHERE id_answer = ?",
      [id_answer]
    );
    return rows[0];
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM answers WHERE id_user = ?",
      [id_user]
    );
    return rows;
  },

  create: async ({ id_user, id_question, selected_choice }) => {
    const [result] = await connection.execute(
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

  update: async (id_answer, { id_user, id_question, selected_choice }) => {
    const [result] = await connection.execute(
      "UPDATE answers SET id_user = ?, id_question = ?, selected_choice = ? WHERE id_answer = ?",
      [id_user, id_question, selected_choice, id_answer]
    );
    if (result.affectedRows === 0) return null;
    return { id_answer, id_user, id_question, selected_choice };
  },

  remove: async (id_answer) => {
    const [result] = await connection.execute(
      "DELETE FROM answers WHERE id_answer = ?",
      [id_answer]
    );
    return result.affectedRows > 0;
  },
};

export default Answer;