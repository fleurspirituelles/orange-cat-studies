import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connection from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, "database", "mysql", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

connection.query(schema, (err) => {
  if (err) {
    console.error("Erro ao executar o schema.sql:", err.message);
  } else {
    console.log("Banco de dados resetado com sucesso.");
  }
  connection.end();
});