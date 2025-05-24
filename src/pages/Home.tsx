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

      <section className="bg-white px-6 pt-12 text-center">
        <div className="inline-block px-8 py-8 mx-auto bg-white max-w-3xl mb-16">
          <p className="text-2xl md:text-3xl text-gray-900 font-semibold leading-tight">
            <span className="text-orange-500 font-extrabold">Comece agora</span>{" "}
            a estudar para concursos <br /> com{" "}
            <span className="text-orange-500 font-extrabold">
              questões extraídas
            </span>{" "}
            dos editais!
          </p>
        </div>

        <img
          src="/logo-large.svg"
          alt="Logo"
          className="mx-auto w-64 md:w-80 mb-16"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20" id="por-que-utilizar">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Por que utilizar o Orange Cat Studies?
          </h2>
          <p className="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto">
            Nosso sistema transforma a preparação para concursos em uma
            experiência interativa e motivadora. Com extração inteligente de
            questões, recompensas diárias e estatísticas detalhadas, você estuda
            com mais eficiência e mantém a constância necessária para alcançar
            sua aprovação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <p className="text-4xl font-bold text-orange-500 mb-4">01</p>
            <h3 className="text-xl font-semibold mb-2">
              Extração Inteligente de Editais
            </h3>
            <p className="text-sm text-neutral-700">
              Acesse questões diretamente dos editais cadastrados ou adicione
              novos documentos.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <p className="text-4xl font-bold text-orange-500 mb-4">02</p>
            <h3 className="text-xl font-semibold mb-2">
              Recompensas Diárias com Tirinhas
            </h3>
            <p className="text-sm text-neutral-700">
              Resolva questões e desbloqueie tirinhas para adicionar ao seu
              álbum de figurinhas.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <p className="text-4xl font-bold text-orange-500 mb-4">03</p>
            <h3 className="text-xl font-semibold mb-2">
              Estatísticas e Relatórios
            </h3>
            <p className="text-sm text-neutral-700">
              Identifique temas mais errados, veja seu desempenho e melhore sua
              preparação.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 px-6" id="faq">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-sm text-neutral-700">
              Ainda tem dúvidas? Entre em contato com nossa equipe pelo e-mail{" "}
              <a
                href="mailto:suporte@garfieldstudies.com"
                className="text-orange-500 underline"
              >
                suporte@garfieldstudies.com
              </a>
              .
            </p>
          </div>

          <div className="md:w-2/3 space-y-4">
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
        </div>
      </section>

      <Footer />
    </>
  );
}