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

  create: async (answer) => {
    const { id_user, id_question, selected_choice, answer_time } = answer;
    const [result] = await connection.execute(
      "INSERT INTO answers (id_user, id_question, selected_choice, answer_time, answer_date) VALUES (?, ?, ?, ?, NOW())",
      [id_user, id_question, selected_choice, answer_time]
    );
    return { id_answer: result.insertId, ...answer };
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