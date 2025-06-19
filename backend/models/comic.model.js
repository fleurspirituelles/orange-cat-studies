import connection from "../config/database.js";

const Comic = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM comics");
    return rows;
  },

  getById: async (id_comic) => {
    const [rows] = await connection.execute(
      "SELECT * FROM comics WHERE id_comic = ?",
      [id_comic]
    );
    return rows[0] || null;
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM comics WHERE id_user = ? ORDER BY comic_date",
      [id_user]
    );
    return rows;
  },

  getByDate: async (id_user, comic_date) => {
    const [rows] = await connection.execute(
      "SELECT * FROM comics WHERE id_user = ? AND comic_date = ?",
      [id_user, comic_date]
    );
    return rows[0] || null;
  },

  existsForDate: async (id_user, comic_date) => {
    const [rows] = await connection.execute(
      "SELECT 1 FROM comics WHERE id_user = ? AND comic_date = ?",
      [id_user, comic_date]
    );
    return rows.length > 0;
  },

  updateAnsweredCount: async (id_user, comic_date, count) => {
    const [result] = await connection.execute(
      "UPDATE comics SET answered_count = ? WHERE id_user = ? AND comic_date = ?",
      [count, id_user, comic_date]
    );
    return result.affectedRows > 0;
  },

  create: async (comic) => {
    const { id_user, comic_date, image_url, answered_count } = comic;
    try {
      const [result] = await connection.execute(
        "INSERT INTO comics (id_user, comic_date, image_url, answered_count) VALUES (?, ?, ?, ?)",
        [id_user, comic_date, image_url, answered_count]
      );
      return { id_comic: result.insertId, ...comic };
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return await Comic.getByDate(id_user, comic_date);
      }
      throw err;
    }
  },

  remove: async (id_comic) => {
    const [result] = await connection.execute(
      "DELETE FROM comics WHERE id_comic = ?",
      [id_comic]
    );
    return result.affectedRows > 0;
  },
};

export default Comic;