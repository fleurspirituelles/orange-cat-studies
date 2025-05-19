const connection = require("../config/database");

async function handleAuth(req, res) {
  const { uid, name, email } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  try {
    const [existing] = await connection.execute(
      "SELECT * FROM users WHERE uid = ?",
      [uid]
    );

    if (existing.length > 0) {
      return res.status(200).json({ message: "Usuário já existe." });
    }

    await connection.execute(
      "INSERT INTO users (uid, name, email) VALUES (?, ?, ?)",
      [uid, name, email]
    );

    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

module.exports = {
  handleAuth,
};