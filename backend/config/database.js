const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("purrfect_studies", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

async function connectMySQL() {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL successfully.");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
}

module.exports = connectMySQL;
module.exports.sequelize = sequelize;