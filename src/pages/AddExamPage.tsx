import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

interface ExamForm {
  exam_name: string;
  board: string;
  level: string;
  year: string;
  position: string;
}

export default function AddExamPage() {
  const [form, setForm] = useState<ExamForm>({
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
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do concurso
              </label>
              <Input
                name="exam_name"
                value={form.exam_name}
                onChange={handleChange}
                placeholder="Ex: Tribunal de Justiça"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banca organizadora
              </label>
              <Input
                name="board"
                value={form.board}
                onChange={handleChange}
                placeholder="Ex: VUNESP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nível do concurso
              </label>
              <Input
                name="level"
                value={form.level}
                onChange={handleChange}
                placeholder="Ex: Médio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ano
              </label>
              <Input
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="Ex: 2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cargo
              </label>
              <Input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Ex: Escrevente Técnico Judiciário"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texto completo da prova
              </label>
              <textarea
                rows={8}
                value={examText}
                onChange={(e) => setExamText(e.target.value)}
                className="w-full rounded border-gray-300 p-2"
                placeholder="Cole aqui o texto completo da prova"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texto do gabarito
              </label>
              <textarea
                rows={4}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                className="w-full rounded border-gray-300 p-2"
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