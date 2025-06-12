import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
    initial.map((q) => ({ ...q, include: true }))
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
    if (!toImport.length) {
      alert("Marque ao menos uma questão.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/exams/import-questions", {
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
      <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Revisão de Questões
          </h2>
          {questions.map((q, idx) => (
            <div key={q.number} className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={q.include}
                  onChange={() => updateQuestion(idx, { include: !q.include })}
                  className="mt-1 h-4 w-4 text-orange-600"
                />
                <div className="flex-1 space-y-4">
                  <div className="text-sm font-semibold text-gray-700">
                    Questão {q.number}
                  </div>
                  <textarea
                    value={q.supportText}
                    onChange={(e) =>
                      updateQuestion(idx, { supportText: e.target.value })
                    }
                    placeholder="Texto de apoio (cole aqui, ex: poema ou texto-base)"
                    className="w-full rounded border-gray-300 p-2 text-sm"
                    rows={2}
                  />
                  <textarea
                    value={q.statement}
                    onChange={(e) =>
                      updateQuestion(idx, { statement: e.target.value })
                    }
                    className="w-full rounded border-gray-300 p-2"
                    rows={3}
                  />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {["A", "B", "C", "D", "E"].map((letter) => (
                      <div key={letter} className="flex items-center">
                        <span className="mr-2 font-medium">{letter})</span>
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
                  <div className="mt-4 flex items-center space-x-6">
                    <span className="text-sm font-medium text-gray-700">
                      Gabarito recomendado:
                    </span>
                    {["A", "B", "C", "D", "E"].map((letter) => (
                      <label
                        key={letter}
                        className="inline-flex items-center space-x-1 text-orange-600"
                      >
                        <input
                          type="radio"
                          name={`answer_${idx}`}
                          value={letter}
                          checked={q.answer_key === letter}
                          onChange={() =>
                            updateQuestion(idx, { answer_key: letter })
                          }
                          className="text-orange-600 focus:ring-orange-400"
                        />
                        <span
                          className={
                            q.answer_key === letter
                              ? "font-semibold"
                              : "font-normal"
                          }
                        >
                          {letter}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
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