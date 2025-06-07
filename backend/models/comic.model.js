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
    return rows[0];
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM comics WHERE id_user = ?",
      [id_user]
    );
    return rows;
  },

  create: async (comic) => {
    const { id_user, comic_date, image_url } = comic;
    const [result] = await connection.execute(
      "INSERT INTO comics (id_user, comic_date, image_url) VALUES (?, ?, ?)",
      [id_user, comic_date, image_url]
    );
    return { id_comic: result.insertId, ...comic };
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