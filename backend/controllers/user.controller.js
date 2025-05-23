import db from "../config/database.js";

export const getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

export const getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id_user = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

export const getByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(200).json(rows[0]);
    }

    const name = email.split("@")[0];

    const [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    const [newUser] = await db.query("SELECT * FROM users WHERE id_user = ?", [
      result.insertId,
    ]);

    res.status(201).json(newUser[0]);
  } catch (error) {
    res.status(500).json({ message: "Error handling user email", error });
  }
};