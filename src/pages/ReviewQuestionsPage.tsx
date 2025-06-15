import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

type ChoiceMap = Record<string, string>;

interface QuestionData {
  number: string;
  supportText: string;
  statement: string;
  choices: ChoiceMap;
  answer_key: string | null;
  include: boolean;
}

export default function ReviewQuestionsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id_exam, questions: initial } = state as {
    id_exam: number;
    questions: Omit<QuestionData, "include">[];
  };

  const [questions, setQuestions] = useState<QuestionData[]>(
    initial.map((q) => {
      const allChoicesFilled = ["A", "B", "C", "D", "E"].every((letter) =>
        q.choices[letter]?.trim()
      );
      return { ...q, include: allChoicesFilled };
    })
  );

  const [loading, setLoading] = useState(false);

  const updateQuestion = (i: number, upd: Partial<QuestionData>) => {
    setQuestions((qs) =>
      qs.map((q, idx) => (idx === i ? { ...q, ...upd } : q))
    );
  };

  const handleImport = async () => {
    const toImport = questions
      .filter((q) => q.include)
      .map(({ include, ...q }) => q);
    if (!toImport.length) return;
    setLoading(true);
    try {
      await api.post("/exams/import-questions", {
        id_exam,
        questions: toImport,
      });
      navigate("/questions");
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-14 px-4">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
              Revisão de Questões
            </h2>
            <p className="text-neutral-700 text-base leading-relaxed text-center md:text-left">
              Revise abaixo todas as questões extraídas. Corrija eventuais erros
              no enunciado, texto de apoio e alternativas. Utilize o seletor de
              gabarito para indicar a resposta correta. Desmarque as questões
              que não deseja importar. Apenas as selecionadas serão salvas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((q, idx) => (
              <div
                key={q.number + idx}
                className="bg-white rounded-2xl shadow p-5 border"
              >
                <div className="flex items-start mb-3">
                  <input
                    type="checkbox"
                    checked={q.include}
                    onChange={() =>
                      updateQuestion(idx, { include: !q.include })
                    }
                    className="mt-1 mr-3 h-4 w-4 text-orange-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-orange-500 mb-4 uppercase tracking-wide">
                      Questão {q.number}
                    </div>

                    <textarea
                      value={q.supportText}
                      onChange={(e) =>
                        updateQuestion(idx, { supportText: e.target.value })
                      }
                      placeholder="Texto de apoio (ex: poema, imagem, gráfico ou descrição complementar)"
                      className="w-full rounded border-gray-300 p-2 text-sm mb-3"
                      rows={3}
                    />

                    <textarea
                      value={q.statement}
                      onChange={(e) =>
                        updateQuestion(idx, { statement: e.target.value })
                      }
                      className="w-full rounded border-gray-300 p-2 text-sm mb-3"
                      rows={2}
                    />

                    <div className="space-y-2 mb-3">
                      {["A", "B", "C", "D", "E"].map((letter) => (
                        <div key={letter} className="flex items-center gap-2">
                          <span className="font-medium text-sm w-5">
                            {letter})
                          </span>
                          <Input
                            value={q.choices[letter] || ""}
                            onChange={(e) =>
                              updateQuestion(idx, {
                                choices: {
                                  ...q.choices,
                                  [letter]: e.target.value,
                                },
                              })
                            }
                            placeholder={`Alternativa ${letter}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-medium text-gray-700">
                        Gabarito:
                      </span>
                      {["A", "B", "C", "D", "E"].map((letter) => (
                        <button
                          key={letter}
                          onClick={() =>
                            updateQuestion(idx, { answer_key: letter })
                          }
                          className={`h-8 w-8 rounded-full border flex items-center justify-center text-sm font-medium ${
                            q.answer_key === letter
                              ? "bg-orange-500 text-white border-orange-500"
                              : "border-gray-300 text-gray-700"
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button
              onClick={handleImport}
              className="w-full max-w-xs"
              disabled={loading}
            >
              {loading ? "Importando..." : "Importar Questões"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}