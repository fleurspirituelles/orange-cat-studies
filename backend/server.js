import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import examRoutes from "./routes/exam.routes.js";
import albumRoutes from "./routes/album.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import choiceRoutes from "./routes/choice.routes.js";
import comicRoutes from "./routes/comic.routes.js";
import performanceRoutes from "./routes/performance.routes.js";
import questionRoutes from "./routes/question.routes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/exams", examRoutes);
app.use("/albums", albumRoutes);
app.use("/answers", answerRoutes);
app.use("/choices", choiceRoutes);
app.use("/comics", comicRoutes);
app.use("/performance", performanceRoutes);
app.use("/questions", questionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}.`);
});