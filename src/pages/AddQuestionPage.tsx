import { useState } from "react";
import { Input } from "../components/ui/Input";
import ExamForm, { ExamFormData } from "../components/ExamForm";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { getCurrentUser } from "../lib/authUser";

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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      if (!user?.id_user) {
        alert("Usuário não identificado.");
        return;
      }

      const { exam_name, board, level, year, position } = newExam;
      if (!exam_name || !board || !level || !year || !position) {
        alert("Preencha todos os campos do edital.");
        return;
      }
      const examRes = await axios.post("http://localhost:5000/exams", {
        id_user: user.id_user,
        exam_name,
        board,
        level,
        year,
        position,
      });
      const id_exam = examRes.data.id_exam;

      const { statement, A, B, C, D, E, answer_key } = form;
      if (!statement || !A || !B || !C || !D || !E || !answer_key) {
        alert("Preencha todos os campos da questão.");
        return;
      }
      const qRes = await axios.post("http://localhost:5000/questions", {
        id_exam,
        statement,
        answer_key,
      });
      const id_question = qRes.data.id_question;

      await Promise.all(
        ["A", "B", "C", "D", "E"].map((letter) =>
          axios.post("http://localhost:5000/choices", {
            id_question,
            letter,
            description: form[letter as keyof typeof form],
          })
        )
      );

      alert("Questão cadastrada com sucesso!");
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
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Cadastro de Questões
          </h2>

          <div className="mb-6">
            <ExamForm form={newExam} onChange={handleNewExamChange} />
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
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
                <label className="text-sm font-medium mb-1 block text-gray-700">
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
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Resposta Correta
              </label>
              <select
                name="answer_key"
                value={form.answer_key}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione</option>
                {(["A", "B", "C", "D", "E"] as const).map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Questão"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}