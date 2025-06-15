import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";

interface Choice {
  letter: string;
  description: string;
}

interface Question {
  id_question: number;
  statement: string;
  answer_key: string;
  choices: Choice[];
  exam_name: string;
  board: string;
  year: number;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Question[]>("/questions").then((res) => {
      let qs = res.data;
      qs.sort(() => Math.random() - 0.5);
      if (qs.length > 10) qs = qs.slice(0, 10);
      setQuestions(qs);
    });
  }, []);

  useEffect(() => {
    setSelectedOptions(Array(questions.length).fill(-1));
    setCorrectAnswers(null);
  }, [questions]);

  const allAnswered = selectedOptions.every((sel) => sel !== -1);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (correctAnswers) return;

    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[questionIndex] =
        updated[questionIndex] === optionIndex ? -1 : optionIndex;
      return updated;
    });
  };

  const handleCorrigir = () => {
    if (!allAnswered) {
      alert("Por favor, responda todas as questões antes de corrigir.");
      return;
    }

    const results = questions.map((q, i) => {
      const sel = selectedOptions[i];
      return q.choices[sel].letter === q.answer_key;
    });
    setCorrectAnswers(results);
  };

  const handleEntregar = async () => {
    if (!allAnswered) {
      alert("Por favor, responda todas as questões antes de entregar.");
      return;
    }

    try {
      await Promise.all(
        questions.map((q, i) => {
          const sel = selectedOptions[i];
          const letter = q.choices[sel].letter;
          return api.post("/answers", {
            id_question: q.id_question,
            selected_choice: letter,
          });
        })
      );
      navigate("/comics");
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-14 px-4">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
              Resolva suas questões!
            </h2>
            <p className="text-neutral-700 text-sm leading-relaxed text-center md:text-left">
              Responda abaixo as questões do dia. Após selecionar as
              alternativas, clique em <strong>Corrigir</strong> para visualizar
              o resultado. Depois, clique em <strong>Entregar</strong> para
              registrar suas respostas e desbloquear novas tirinhas.
            </p>
          </div>

          <div className="space-y-8">
            {questions.map((q, i) => (
              <div
                key={q.id_question}
                className="bg-white rounded-2xl shadow p-6 border"
              >
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-orange-500 mb-2">
                    ({q.year}) {q.board} – {q.exam_name}
                  </h3>
                  <p className="text-sm text-gray-700">{q.statement}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {q.choices.map((choice, idx) => {
                    const isSelected = selectedOptions[i] === idx;
                    const isCorrect = correctAnswers?.[i] ?? false;
                    const correctLetter = q.answer_key;
                    const baseClass =
                      "rounded-xl border px-4 py-4 text-sm font-medium transition-all duration-200 text-left";
                    let variantClass = "";

                    if (correctAnswers) {
                      if (choice.letter === correctLetter) {
                        variantClass =
                          "bg-green-500 text-white border-green-500";
                      } else if (isSelected && !isCorrect) {
                        variantClass = "bg-red-500 text-white border-red-500";
                      } else {
                        variantClass = "bg-white text-gray-700 border-gray-200";
                      }
                    } else {
                      variantClass = isSelected
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-200 hover:border-orange-500";
                    }

                    return (
                      <button
                        key={choice.letter}
                        onClick={() => handleSelect(i, idx)}
                        className={`${baseClass} ${variantClass}`}
                      >
                        <span className="block font-bold mb-1">
                          {choice.letter})
                        </span>
                        {choice.description}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center gap-4">
            <Button
              className="w-full max-w-xs"
              onClick={handleCorrigir}
              disabled={!allAnswered || correctAnswers !== null}
            >
              Corrigir
            </Button>
            <Button
              className="w-full max-w-xs"
              onClick={handleEntregar}
              disabled={!allAnswered}
            >
              Entregar
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}