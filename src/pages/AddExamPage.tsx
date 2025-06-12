import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExamForm, { ExamFormData } from "../components/ExamForm";
import { TextArea } from "../components/ui/TextArea";
import { Button } from "../components/ui/Button";

export default function AddExamPage() {
  const [form, setForm] = useState<ExamFormData>({
    exam_name: "",
    board: "",
    level: "",
    year: "",
    position: "",
  });
  const [examText, setExamText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.id_user) {
      alert("Usuário não identificado.");
      return;
    }
    const { exam_name, board, level, year, position } = form;
    if (!exam_name || !board || !level || !year || !position) {
      alert("Preencha todos os campos.");
      return;
    }
    if (!examText.trim() || !answerText.trim()) {
      alert("Cole o texto da prova e do gabarito.");
      return;
    }
    setLoading(true);
    try {
      const previewRes = await axios.post(
        "http://localhost:5000/exams/preview-questions",
        { examText, answerText },
        { headers: { "Content-Type": "application/json" } }
      );
      const questions = previewRes.data;

      const createRes = await axios.post("http://localhost:5000/exams", {
        id_user: user.id_user,
        exam_name,
        board,
        level,
        year,
        position,
      });
      const id_exam = createRes.data.id_exam;

      navigate("/review-questions", { state: { id_exam, questions } });
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message;
      alert("Erro: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl bg-white p-8 rounded-xl shadow">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
            Cadastro de Provas
          </h2>
          <ExamForm form={form} onChange={handleChange} />
          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texto completo da prova
              </label>
              <TextArea
                rows={8}
                value={examText}
                onChange={(e) => setExamText(e.target.value)}
                placeholder="Cole aqui o texto completo da prova"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texto do gabarito
              </label>
              <TextArea
                rows={4}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Cole aqui o texto do gabarito"
              />
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Processando..." : "Avançar para Revisão"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}