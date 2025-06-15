import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AddExamPage from "./pages/AddExamPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import ReviewQuestionsPage from "./pages/ReviewQuestionsPage";
import QuestionsPage from "./pages/QuestionsPage";
import ComicsPage from "./pages/ComicsPage";
import ProtectedRoute from "./lib/ProtectedRoute";
import { AuthProvider } from "./lib/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
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
          path="/review-questions"
          element={
            <ProtectedRoute>
              <ReviewQuestionsPage />
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
        <Route
          path="/comics"
          element={
            <ProtectedRoute>
              <ComicsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}