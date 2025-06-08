import db from "../config/database.js";

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password || null]
    );

    const [newUser] = await db.query("SELECT * FROM users WHERE id_user = ?", [
      result.insertId,
    ]);

    res.status(201).json(newUser[0]);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

export { registerUser };