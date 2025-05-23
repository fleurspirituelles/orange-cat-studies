import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AddExamPage from "./pages/AddExamPage";
import ManualExamForm from "./pages/ManualExamForm";
import ProtectedRoute from "./lib/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/add-exam" element={<AddExamPage />} />
      <Route path="/add-exam/manual" element={<ManualExamForm />} />
    </Routes>
  );
}

export default App;