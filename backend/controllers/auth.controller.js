const connection = require("../config/database");

async function handleAuth(req, res) {
  const { name, email } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Nome e e-mail são obrigatórios." });
  }

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(200).json({ message: "Usuário já existe." });
    }

    await connection.execute("INSERT INTO users (name, email) VALUES (?, ?)", [
      name,
      email,
    ]);

    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

module.exports = {
  handleAuth,
};