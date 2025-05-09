const express = require("express");
const connectMongo = require("./config/mongo");
const connectMySQL = require("./config/database");
const tirinhaRoutes = require("./routes/tirinha.routes");

const app = express();
app.use(express.json());
app.use("/tirinhas", tirinhaRoutes);

const port = 3000;

async function startServer() {
  try {
    await connectMongo();
    await connectMySQL();
    app.listen(port, () => {
      console.log(`Server running on port ${port}.`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();