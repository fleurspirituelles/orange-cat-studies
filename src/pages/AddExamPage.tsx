import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
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
  const [mode, setMode] = useState<"text" | "pdf">("text");
  const [examText, setExamText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [examPdf, setExamPdf] = useState<File | null>(null);
  const [answerPdf, setAnswerPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { exam_name, board, level, year, position } = form;
    if (!exam_name || !board || !level || !year || !position) {
      alert("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      let questions;
      if (mode === "text") {
        if (!examText.trim() || !answerText.trim()) {
          alert("Cole o texto da prova e do gabarito.");
          setLoading(false);
          return;
        }
        const previewRes = await api.post("/exams/preview-questions", {
          examText,
          answerText,
        });
        questions = previewRes.data;
      } else {
        if (!examPdf || !answerPdf) {
          alert("Envie ambos os arquivos PDF.");
          setLoading(false);
          return;
        }
        const fd = new FormData();
        fd.append("examPdf", examPdf);
        fd.append("answerPdf", answerPdf);
        const previewRes = await api.post("/exams/preview-questions-pdf", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        questions = previewRes.data;
      }

      const createRes = await api.post("/exams", {
        name: exam_name,
        year: parseInt(year),
        exam_board: board,
        position,
        level,
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

          <fieldset className="mt-6 flex gap-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={mode === "text"}
                onChange={() => setMode("text")}
              />
              Colar texto
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={mode === "pdf"}
                onChange={() => setMode("pdf")}
              />
              Enviar PDF
            </label>
          </fieldset>

          {mode === "text" ? (
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
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PDF da prova
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setExamPdf(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PDF do gabarito
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setAnswerPdf(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-700"
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Processando..." : "Avançar para Revisão"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}