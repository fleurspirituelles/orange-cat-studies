import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import examRoutes from "./routes/exam.routes.js";
import questionRoutes from "./routes/question.routes.js";
import topicRoutes from "./routes/topic.routes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/exams", examRoutes);
app.use("/questions", questionRoutes);
app.use("/topics", topicRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}.`);
  });
}

export default app;