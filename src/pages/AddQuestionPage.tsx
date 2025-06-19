import { useState, useMemo } from "react";
import { Input } from "../components/ui/Input";
import ExamForm, { ExamFormData } from "../components/ExamForm";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";

export default function AddQuestionPage() {
  const [newExam, setNewExam] = useState<ExamFormData>({
    exam_name: "",
    board: "",
    level: "",
    year: "",
    position: "",
  });

  const [form, setForm] = useState({
    statement: "",
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    answer_key: "",
  });

  const [loading, setLoading] = useState(false);

  const handleNewExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnswerKeySelect = (letter: string) => {
    setForm((prev) => ({ ...prev, answer_key: letter }));
  };

  const isExamValid = useMemo(() => {
    return (
      newExam.exam_name.trim() &&
      newExam.board.trim() &&
      newExam.level.trim() &&
      /^\d{4}$/.test(newExam.year.trim()) &&
      newExam.position.trim()
    );
  }, [newExam]);

  const isQuestionValid = useMemo(() => {
    return (
      form.statement.trim() &&
      form.A.trim() &&
      form.B.trim() &&
      form.C.trim() &&
      form.D.trim() &&
      form.E.trim() &&
      form.answer_key
    );
  }, [form]);

  const canSubmit = useMemo(() => {
    return isExamValid && isQuestionValid;
  }, [isExamValid, isQuestionValid]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const examRes = await api.post("/exams", {
        exam_name: newExam.exam_name,
        board: newExam.board,
        level: newExam.level,
        year: newExam.year,
        position: newExam.position,
      });
      const id_exam = examRes.data.id_exam;

      const qRes = await api.post("/questions", {
        id_exam,
        statement: form.statement,
        answer_key: form.answer_key,
      });
      const id_question = qRes.data.id_question;

      await Promise.all(
        ["A", "B", "C", "D", "E"].map((letter) =>
          api.post("/choices", {
            id_question,
            letter,
            description: form[letter as keyof typeof form],
          })
        )
      );

      setForm({
        statement: "",
        A: "",
        B: "",
        C: "",
        D: "",
        E: "",
        answer_key: "",
      });

      setNewExam({
        exam_name: "",
        board: "",
        level: "",
        year: "",
        position: "",
      });
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
      <main className="bg-neutral-100 pt-8 pb-2 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
              Adicionar Nova Questão
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed text-center md:text-left">
              Insira manualmente novas questões no sistema de forma organizada e
              detalhada. Primeiro, preencha as informações da prova, informando
              o concurso, banca, ano e cargo. Em seguida, cadastre o enunciado,
              alternativas e selecione o gabarito correto. As questões
              adicionadas serão integradas aos desafios diários automaticamente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-5 border">
              <h3 className="text-base font-semibold mb-4">
                Informações da Prova
              </h3>
              <ExamForm form={newExam} onChange={handleNewExamChange} />
            </div>

            <div className="bg-white rounded-xl shadow p-5 border flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold mb-4">
                  Cadastro da Questão
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enunciado
                    </label>
                    <Input
                      name="statement"
                      value={form.statement}
                      onChange={handleFormChange}
                      placeholder="Digite o enunciado"
                    />
                  </div>

                  {(["A", "B", "C", "D", "E"] as const).map((letter) => (
                    <div key={letter}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alternativa {letter}
                      </label>
                      <Input
                        name={letter}
                        value={form[letter]}
                        onChange={handleFormChange}
                        placeholder={`Digite a alternativa ${letter}`}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resposta Correta
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["A", "B", "C", "D", "E"].map((letter) => (
                        <button
                          key={letter}
                          onClick={() => handleAnswerKeySelect(letter)}
                          type="button"
                          className={`h-8 w-8 rounded-full border flex items-center justify-center text-sm font-medium transition ${
                            form.answer_key === letter
                              ? "bg-orange-500 text-white border-orange-500"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <Button
                  onClick={handleSubmit}
                  className="w-full text-sm"
                  disabled={!canSubmit || loading}
                >
                  {loading ? "Salvando..." : "Salvar Questão"}
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