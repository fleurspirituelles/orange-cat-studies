import fs from "fs";
import path from "path";
import mysql from "mysql2";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, "database", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err.message);
    process.exit(1);
  }
  connection.query(schema, (err) => {
    if (err) console.error("Erro ao executar schema.sql:", err.message);
    else console.log("Banco e tabelas criados com sucesso.");
    connection.end();
  });
});