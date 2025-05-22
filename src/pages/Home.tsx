import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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

  return (
    <>
      <Navbar />
      <section className="bg-orange-100 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Comece agora a estudar para concursos com questões extraídas dos
          editais!
        </h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto">
          Transforme seus estudos em uma jornada divertida com Garfield e
          conquiste recompensas enquanto aprende.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">
          Benefícios do sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">
              Extração Inteligente de Editais
            </h3>
            <p className="text-sm text-neutral-700">
              Faça upload do seu PDF e o sistema identificará banca, disciplinas
              e questões automaticamente.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">
              Recompensas Diárias com Tirinhas
            </h3>
            <p className="text-sm text-neutral-700">
              Ao completar 10 questões por dia, desbloqueie tirinhas exclusivas
              do Garfield e monte seu álbum.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">
              Estatísticas e Relatórios
            </h3>
            <p className="text-sm text-neutral-700">
              Acompanhe sua evolução com relatórios semanais e gráficos de
              desempenho por tema.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-20 px-6">
        <h2 className="text-2xl font-bold text-center mb-12">
          Perguntas Frequentes
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-white"
            >
              <button
                className="w-full text-left p-4 font-semibold flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t text-sm text-neutral-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}