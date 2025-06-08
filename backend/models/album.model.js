import connection from "../config/database.js";

const Album = {
  getAll: async () => {
    const [rows] = await connection.execute("SELECT * FROM albums");
    return rows;
  },

  getById: async (id_album) => {
    const [rows] = await connection.execute(
      "SELECT * FROM albums WHERE id_album = ?",
      [id_album]
    );
    return rows[0];
  },

  getByUser: async (id_user) => {
    const [rows] = await connection.execute(
      "SELECT * FROM albums WHERE id_user = ?",
      [id_user]
    );
    return rows;
  },

  create: async (album) => {
    const { id_user, month, year, total_days } = album;
    const [result] = await connection.execute(
      "INSERT INTO albums (id_user, month, year, total_days) VALUES (?, ?, ?, ?)",
      [id_user, month, year, total_days]
    );
    return { id_album: result.insertId, ...album };
  },

  update: async (id_album, album) => {
    const { month, year, total_days } = album;
    const [result] = await connection.execute(
      "UPDATE albums SET month = ?, year = ?, total_days = ? WHERE id_album = ?",
      [month, year, total_days, id_album]
    );
    return result.affectedRows > 0;
  },

  remove: async (id_album) => {
    const [result] = await connection.execute(
      "DELETE FROM albums WHERE id_album = ?",
      [id_album]
    );
    return result.affectedRows > 0;
  },
};

export default Album;