import mysql from "mysql2/promise";

const {
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "root",
  DB_NAME = "purrfect_studies",
} = process.env;

const connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export default connection;