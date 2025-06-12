import mysql from "mysql2/promise";

export default async function runSQL(script) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      multipleStatements: true,
    });
    console.log("Conectado ao MySQL, executando script...");
    await connection.query(script);
    console.log("Script SQL executado com sucesso.");
  } catch (err) {
    console.error("Erro ao executar o script SQL:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
      console.log("Conexão com o banco encerrada.");
    }
  }
}