const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const schemaPath = path.join(__dirname, "database", "mysql", "schema.sql");
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
    return;
  }

  connection.query(schema, (err) => {
    if (err) {
      console.error("Erro ao executar o schema.sql:", err.message);
    } else {
      console.log("Banco apagado e recriado com sucesso.");
    }
    connection.end();
  });
});
