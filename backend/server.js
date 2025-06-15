import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import examRoutes from "./routes/exam.routes.js";
import albumRoutes from "./routes/album.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import choiceRoutes from "./routes/choice.routes.js";
import comicRoutes from "./routes/comic.routes.js";
import performanceRoutes from "./routes/performance.routes.js";
import questionRoutes from "./routes/question.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/users", userRoutes);
app.use("/exams", examRoutes);
app.use("/albums", albumRoutes);
app.use("/answers", answerRoutes);
app.use("/choices", choiceRoutes);
app.use("/comics", comicRoutes);
app.use("/performance", performanceRoutes);
app.use("/questions", questionRoutes);

app.use((err, req, res, next) => {
  console.error("Uncaught error:", err.stack || err);
  res
    .status(500)
    .json({ message: "Internal server error.", error: err.message });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}.`);
  });
}

export default app;