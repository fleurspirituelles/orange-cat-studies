import mysql from "mysql2/promise";

export default async function runSQL(script) {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root",
      multipleStatements: true,
    });

    console.log("Executando script SQL...");
    await connection.query(script);
    console.log("Script SQL executado com sucesso.");
  } catch (err) {
    console.error("Erro ao executar o script SQL:", err.message);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
      console.log("Conexão com o banco encerrada.");
    }
  }
}