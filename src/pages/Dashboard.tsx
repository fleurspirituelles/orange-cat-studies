import React, { useState } from "react";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const faqs = [
    {
      question: "Como as questões são selecionadas para o desafio diário?",
      answer:
        "As questões são extraídas automaticamente dos editais cadastrados, garantindo uma experiência personalizada de estudo.",
    },
    {
      question: "Posso cadastrar meus próprios editais e questões?",
      answer:
        "Sim! Você pode cadastrar novos editais e importar questões diretamente.",
    },
    {
      question: "O que acontece se eu errar uma questão?",
      answer:
        "Você verá um alerta sobre o tema que precisa revisar e poderá adicioná-la à sua lista de revisão.",
    },
    {
      question: "Como funcionam as recompensas das tirinhas?",
      answer:
        "A cada dia que você estuda, desbloqueia uma tirinha nova do Garfield para o seu álbum.",
    },
    {
      question: "Posso revisar minhas estatísticas e progresso?",
      answer:
        "Sim. Você terá acesso a relatórios semanais e mensais com dados sobre seu desempenho.",
    },
  ];

  const stats = [
    {
      label: "Questões Respondidas",
      value: 12,
    },
    {
      label: "Tirinhas Resgatadas",
      value: 3,
    },
    {
      label: "Questões para Revisão",
      value: 5,
    },
  ];

  return (
    <div className="text-gray-800">
      <nav className="flex items-center justify-between px-6 py-3 bg-orange-500 text-white">
        <span className="font-bold text-lg">😺</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold hidden sm:block">
            {user?.displayName || user?.name || "usuária(o)"}
          </span>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </nav>

      <div className="bg-orange-500 text-white py-12 text-center px-4">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vinda, {user?.displayName || user?.name || "usuária(o)"}!
        </h1>
        <p className="text-lg">
          Comece agora a estudar com questões extraídas diretamente dos editais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mt-12">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-xl border px-6 py-8 text-center"
          >
            <p className="text-4xl font-bold text-orange-500">{item.value}</p>
            <p className="text-sm text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-16">
        {[
          {
            title: "Extração Inteligente de Editais",
            desc: "Acesse questões diretamente dos editais cadastrados ou adicione novos documentos.",
          },
          {
            title: "Recompensas Diárias com Tirinhas",
            desc: "Resolva questões e desbloqueie tirinhas para adicionar ao seu álbum de figurinhas.",
          },
          {
            title: "Estatísticas e Relatórios",
            desc: "Identifique temas mais errados, veja seu desempenho e melhore sua preparação.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white border shadow-sm rounded-xl p-6 text-left"
          >
            <h3 className="text-xl font-bold mb-2">
              {String(i + 1).padStart(2, "0")}
            </h3>
            <h4 className="text-lg font-semibold">{card.title}</h4>
            <p className="text-sm mt-2 text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 py-12 px-4">
        <h3 className="text-center text-2xl font-bold mb-8">
          Perguntas Frequentes
        </h3>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                className="w-full text-left p-4 font-semibold flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t text-sm text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}