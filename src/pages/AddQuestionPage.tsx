import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LayoutWrapper from "../components/ui/LayoutWrapper";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import ExamForm from "../components/ExamForm";

export default function AddQuestionPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    exam_name: "",
    board: "",
    level: "",
    year: "",
    position: "",
    question: "",
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    correct: "A",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectCorrect = (value: string) => {
    setForm({ ...form, correct: value });
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:3001/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      navigate("/questions");
    } catch (err) {
      alert("Erro ao cadastrar questão.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-neutral-100 py-6 px-4">
        <LayoutWrapper>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-5 border">
              <h3 className="text-base font-semibold mb-4">
                Informações da Prova
              </h3>
              <ExamForm form={form} onChange={handleChange} />
            </div>

            <div className="bg-white rounded-xl shadow p-5 border flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold mb-4">
                  Cadastro da Questão
                </h3>
                <div className="space-y-2 text-sm">
                  <Input
                    name="question"
                    placeholder="Digite o enunciado"
                    value={form.question}
                    onChange={handleChange}
                  />
                  <Input
                    name="a"
                    placeholder="Digite a alternativa A"
                    value={form.a}
                    onChange={handleChange}
                  />
                  <Input
                    name="b"
                    placeholder="Digite a alternativa B"
                    value={form.b}
                    onChange={handleChange}
                  />
                  <Input
                    name="c"
                    placeholder="Digite a alternativa C"
                    value={form.c}
                    onChange={handleChange}
                  />
                  <Input
                    name="d"
                    placeholder="Digite a alternativa D"
                    value={form.d}
                    onChange={handleChange}
                  />
                  <Input
                    name="e"
                    placeholder="Digite a alternativa E"
                    value={form.e}
                    onChange={handleChange}
                  />
                  <div>
                    <p className="mb-2 font-medium">Resposta Correta</p>
                    <div className="flex gap-3">
                      {["A", "B", "C", "D", "E"].map((alt) => (
                        <button
                          key={alt}
                          type="button"
                          className={`w-6 h-6 rounded-full border text-sm font-medium ${
                            form.correct === alt
                              ? "bg-orange-500 text-white"
                              : "bg-white text-gray-700 border-gray-300"
                          }`}
                          onClick={() => handleSelectCorrect(alt)}
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Button onClick={handleSubmit} className="w-full text-sm">
                  Salvar Questão
                </Button>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </main>
      <Footer />
    </>
  );
}
