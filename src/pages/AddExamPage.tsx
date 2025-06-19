import { useState, useRef, useMemo } from "react";
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

  const isFormValid = useMemo(() => {
    return (
      form.exam_name.trim() &&
      form.board.trim() &&
      form.level.trim() &&
      form.year.trim() &&
      form.position.trim()
    );
  }, [form]);

  const isTextModeValid = useMemo(() => {
    return examText.trim() && answerText.trim();
  }, [examText, answerText]);

  const isPdfModeValid = useMemo(() => {
    return examPdf !== null && answerPdf !== null;
  }, [examPdf, answerPdf]);

  const canSubmit = useMemo(() => {
    if (!isFormValid) return false;
    if (mode === "text") return isTextModeValid;
    return isPdfModeValid;
  }, [isFormValid, isTextModeValid, isPdfModeValid, mode]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let questions;
      if (mode === "text") {
        const previewRes = await api.post("/exams/preview-questions", {
          examText,
          answerText,
        });
        questions = previewRes.data;
      } else {
        const fd = new FormData();
        fd.append("examPdf", examPdf!);
        fd.append("answerPdf", answerPdf!);
        const previewRes = await api.post("/exams/preview-questions-pdf", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        questions = previewRes.data;
      }

      const createRes = await api.post("/exams", {
        exam_name: form.exam_name,
        board: form.board,
        year: parseInt(form.year),
        position: form.position,
        level: form.level,
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-neutral-100 pt-8 pb-2 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
              Adicionar Nova Prova
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed text-center md:text-left">
              Preencha os dados da prova e escolha como deseja enviar o
              conteúdo: colando o texto ou enviando arquivos PDF. O sistema fará
              a leitura automática para geração das questões.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 border">
              <h3 className="text-base font-semibold mb-4">Dados da Prova</h3>
              <ExamForm form={form} onChange={handleChange} />
            </div>

            <div className="bg-white rounded-xl shadow p-6 border flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold mb-4">
                  Método de Envio
                </h3>

                <div className="flex gap-3 mb-6">
                  <button
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      mode === "text"
                        ? "bg-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setMode("text")}
                  >
                    Colar Texto
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      mode === "pdf"
                        ? "bg-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setMode("pdf")}
                  >
                    Enviar PDF
                  </button>
                </div>

                <div className="space-y-2">
                  {mode === "text" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Texto completo da prova
                        </label>
                        <TextArea
                          rows={4}
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
                          rows={3}
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

              <div className="mt-6">
                <Button
                  onClick={handleSubmit}
                  className="w-full text-sm"
                  disabled={!canSubmit || loading}
                >
                  {loading ? "Processando..." : "Avançar para Revisão"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}