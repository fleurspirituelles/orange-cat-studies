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
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL. Running schema.sql.");

  connection.query(schema, (err) => {
    if (err) {
      console.error("Error executing schema.sql:", err);
    } else {
      console.log("Database created successfully.");
    }
    connection.end();
  });
});