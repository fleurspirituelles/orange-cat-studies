const express = require("express");
const connectMongo = require("./config/mongo");
const connectMySQL = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const albumRoutes = require("./routes/album.routes");
const answerRoutes = require("./routes/answer.routes");
const choiceRoutes = require("./routes/choice.routes");
const comicRoutes = require("./routes/comic.routes");
const examBoardRoutes = require("./routes/examBoard.routes");
const examRoutes = require("./routes/exam.routes");
const performanceRoutes = require("./routes/performance.routes");
const questionRoutes = require("./routes/question.routes");
const questionTopicRoutes = require("./routes/questionTopic.routes");
const reviewRoutes = require("./routes/review.routes");
const topicRoutes = require("./routes/topic.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/choices", choiceRoutes);
app.use("/api/comics", comicRoutes);
app.use("/api/exam-boards", examBoardRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/question-topics", questionTopicRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/users", userRoutes);

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