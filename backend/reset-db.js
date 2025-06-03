import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import runSQL from "./run-sql.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, "database/mysql/schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

await runSQL(schema);

console.log("Banco de dados resetado com sucesso.");