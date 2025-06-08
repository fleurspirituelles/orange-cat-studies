import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AddExamPage from "./pages/AddExamPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import QuestionsPage from "./pages/QuestionsPage";
import ProtectedRoute from "./lib/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/add-exam"
        element={
          <ProtectedRoute>
            <AddExamPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-question"
        element={
          <ProtectedRoute>
            <AddQuestionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/questions"
        element={
          <ProtectedRoute>
            <QuestionsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;