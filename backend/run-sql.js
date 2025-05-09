const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true,
});

const schemaPath = path.join(__dirname, "database", "mysql", "schema.sql");
const seedPath = path.join(__dirname, "database", "mysql", "seed.sql");

const schema = fs.readFileSync(schemaPath, "utf8");
const seed = fs.readFileSync(seedPath, "utf8");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");

  connection.query(schema + seed, (error) => {
    if (error) throw error;
    console.log("Database created and populated successfully!");
    connection.end();
  });
});