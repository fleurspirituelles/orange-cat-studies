import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import axios from "axios";

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

  useEffect(() => {
    axios.get<Question[]>("http://localhost:5000/questions").then((res) => {
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

  const handleSelect = (questionIndex: number, optionIndex: number): void => {
    if (correctAnswers) return;
    const updated = [...selectedOptions];
    updated[questionIndex] = optionIndex;
    setSelectedOptions(updated);
  };

  const handleCorrigir = (): void => {
    const results = questions.map((q, i) => {
      const sel = selectedOptions[i];
      return sel >= 0 && q.choices[sel].letter === q.answer_key;
    });
    setCorrectAnswers(results);
  };

  const handleEntregar = (): void => {
    alert("Questões entregues!");
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 sm:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto space-y-10">
          {questions.map((q, i) => (
            <div key={q.id_question} className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">
                ({q.year}) {q.board} – {q.exam_name}
              </h2>
              <p className="text-sm text-gray-700">{q.statement}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {q.choices.map((choice, idx) => {
                  const isSelected = selectedOptions[i] === idx;
                  const isCorrect = correctAnswers?.[i] ?? false;
                  const correctLetter = q.answer_key;
                  const baseClass =
                    "rounded-lg border px-4 py-4 text-sm font-medium transition-all duration-200 text-left";

                  let variantClass = "";
                  if (correctAnswers) {
                    if (choice.letter === correctLetter) {
                      variantClass = "bg-green-500 text-white border-green-500";
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

          <div className="flex gap-4 justify-center">
            <Button onClick={handleCorrigir}>Corrigir</Button>
            <Button onClick={handleEntregar}>Entregar</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}