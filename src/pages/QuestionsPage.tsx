import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Choice = {
  letter: string;
  description: string;
};

type Question = {
  id_question: number;
  statement: string;
  answer_key: string;
  choices: Choice[];
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get("/questions/user/1")
      .then((res) => {
        console.log("QUESTÕES RECEBIDAS:", res.data);
        setQuestions(res.data);
        setSelectedOptions(Array(res.data.length).fill(-1));
      })
      .catch((err) => console.error("ERRO AO BUSCAR QUESTÕES:", err));
  }, []);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    const updated = [...selectedOptions];
    updated[questionIndex] = optionIndex;
    setSelectedOptions(updated);
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 sm:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0 max-w-md">
              Desafie-se diariamente e fortaleça sua preparação!
            </h1>
            <p className="text-sm text-gray-600 max-w-xl md:text-right">
              Todos os dias, você terá 10 questões selecionadas automaticamente
              dos editais cadastrados. Teste seus conhecimentos, acompanhe seu
              progresso e veja quais temas precisam de mais atenção. Complete
              todas as questões e desbloqueie uma tirinha exclusiva para
              adicionar ao seu álbum de figurinhas!
            </p>
          </div>

          <div className="space-y-10">
            {questions.map((q, i) => (
              <div key={q.id_question} className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Questão {i + 1}
                </h2>
                <p className="text-sm text-gray-700">{q.statement}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {q.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(i, idx)}
                      className={`rounded-lg border px-4 py-4 text-sm font-medium transition-all duration-200 text-left ${
                        selectedOptions[i] === idx
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-orange-500"
                      }`}
                    >
                      <span className="block font-bold mb-1">
                        {choice.letter})
                      </span>
                      {choice.description}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
