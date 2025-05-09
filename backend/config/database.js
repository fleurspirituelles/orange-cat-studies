const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "purrfect_studies",
});

function connectMySQL() {
  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      if (error) {
        console.error("Error connecting to MySQL:", error);
        reject(error);
      } else {
        console.log("Connected to MySQL successfully.");
        resolve(connection);
      }
    });
  });
}

module.exports = connectMySQL;