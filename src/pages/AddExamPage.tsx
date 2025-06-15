import { useState, useRef } from "react";
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

  const examInputRef = useRef<HTMLInputElement>(null);
  const answerInputRef = useRef<HTMLInputElement>(null);

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
      <main className="min-h-screen bg-gray-100 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
              Adição de Provas
            </h2>
            <p className="text-neutral-700 text-sm leading-relaxed text-center md:text-left">
              Escolha abaixo como deseja adicionar sua prova ao sistema. É
              possível carregar os arquivos PDF da prova e do gabarito para
              realizar a extração automática das questões, ou, se preferir,
              preencher manualmente os dados da prova.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 border">
              <h3 className="text-lg font-semibold mb-5">
                Preencher dados da prova
              </h3>
              <ExamForm form={form} onChange={handleChange} />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 border flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-5">
                  Escolha o método de envio
                </h3>

                <div className="flex gap-4 mb-8">
                  <button
                    className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition ${
                      mode === "text"
                        ? "bg-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setMode("text")}
                  >
                    Colar Texto
                  </button>
                  <button
                    className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition ${
                      mode === "pdf"
                        ? "bg-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setMode("pdf")}
                  >
                    Enviar PDF
                  </button>
                </div>

                <div
                  className="space-y-5 transition-all duration-300"
                  style={{ minHeight: 330 }}
                >
                  {mode === "text" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Texto completo da prova
                        </label>
                        <TextArea
                          rows={6}
                          value={examText}
                          onChange={(e) => setExamText(e.target.value)}
                          placeholder="Cole aqui o texto integral da prova."
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
                          placeholder="Cole aqui o texto do gabarito."
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Arquivo PDF da prova
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          ref={examInputRef}
                          onChange={(e) =>
                            setExamPdf(e.target.files?.[0] || null)
                          }
                          className="hidden"
                        />
                        <Button
                          className="w-full text-sm"
                          variant="outline"
                          type="button"
                          onClick={() => examInputRef.current?.click()}
                        >
                          Selecionar arquivo
                        </Button>
                        {examPdf && (
                          <p className="mt-2 text-sm text-gray-600">
                            {examPdf.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Arquivo PDF do gabarito
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          ref={answerInputRef}
                          onChange={(e) =>
                            setAnswerPdf(e.target.files?.[0] || null)
                          }
                          className="hidden"
                        />
                        <Button
                          className="w-full text-sm"
                          variant="outline"
                          type="button"
                          onClick={() => answerInputRef.current?.click()}
                        >
                          Selecionar arquivo
                        </Button>
                        {answerPdf && (
                          <p className="mt-2 text-sm text-gray-600">
                            {answerPdf.name}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={handleSubmit}
                  className="w-full text-sm"
                  disabled={loading}
                >
                  {loading ? "Processando..." : "Avançar para Revisão"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}