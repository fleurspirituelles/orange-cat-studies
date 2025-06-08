import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function AddQuestionPage() {
  const [searchParams] = useSearchParams();
  const id_exam = searchParams.get("id_exam") || "";

  const [form, setForm] = useState({
    statement: "",
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    answer_key: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { statement, A, B, C, D, E, answer_key } = form;
    if (!id_exam || !statement || !A || !B || !C || !D || !E || !answer_key) {
      alert("Preencha todos os campos");
      return;
    }
    const qRes = await axios.post("http://localhost:5000/questions", {
      id_exam,
      statement,
      answer_key,
    });
    const id_question = qRes.data.id_question;
    await Promise.all([
      axios.post("http://localhost:5000/choices", {
        id_question,
        letter: "A",
        description: A,
      }),
      axios.post("http://localhost:5000/choices", {
        id_question,
        letter: "B",
        description: B,
      }),
      axios.post("http://localhost:5000/choices", {
        id_question,
        letter: "C",
        description: C,
      }),
      axios.post("http://localhost:5000/choices", {
        id_question,
        letter: "D",
        description: D,
      }),
      axios.post("http://localhost:5000/choices", {
        id_question,
        letter: "E",
        description: E,
      }),
    ]);
    alert("Questão cadastrada com sucesso");
    setForm({
      statement: "",
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
      answer_key: "",
    });
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Cadastro de Questões
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Edital: #{id_exam}
          </p>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Enunciado
              </label>
              <Input
                name="statement"
                value={form.statement}
                onChange={handleChange}
                placeholder="Digite o enunciado"
              />
            </div>
            {["A", "B", "C", "D", "E"].map((letter) => (
              <div key={letter}>
                <label className="text-sm font-medium mb-1 block text-gray-700">
                  Alternativa {letter}
                </label>
                <Input
                  name={letter}
                  value={form[letter as keyof typeof form] as string}
                  onChange={handleChange}
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
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione</option>
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-2">
              <Button className="w-full" onClick={handleSubmit}>
                Salvar Questão
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}