import mysql from "mysql2/promise";

export default async function runSQL(script) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    multipleStatements: true,
  });

  try {
    await connection.query(script);
  } finally {
    await connection.end();
  }
}