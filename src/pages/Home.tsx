import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LayoutWrapper from "../components/ui/LayoutWrapper";

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Como são geradas as questões do desafio diário?",
      answer:
        "As questões são extraídas automaticamente a partir das provas e gabaritos que você mesmo envia, permitindo uma preparação personalizada baseada em provas anteriores.",
    },
    {
      question: "Posso enviar minhas próprias provas?",
      answer:
        "Sim. Basta enviar provas anteriores e seus respectivos gabaritos. O sistema processa e transforma automaticamente em questões organizadas para seus estudos.",
    },
    {
      question: "Quantas questões preciso resolver por dia?",
      answer:
        "O desafio diário apresenta 10 questões selecionadas aleatoriamente a partir do seu banco de provas, promovendo uma rotina constante e variada.",
    },
    {
      question: "Como funcionam as recompensas com as tirinhas do Garfield?",
      answer:
        "Ao manter sua rotina diária de estudos e resolver os desafios propostos, você desbloqueia tirinhas do Garfield, criando um álbum digital divertido que acompanha sua evolução.",
    },
    {
      question: "Posso visualizar as tirinhas que já desbloqueei?",
      answer:
        "Sim. Todas as tirinhas conquistadas ficam armazenadas no seu álbum digital, disponível para consulta sempre que desejar.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LayoutWrapper>
          <section className="bg-white px-4 pt-8 text-center">
            <div className="inline-block px-4 py-6 mx-auto bg-white max-w-2xl mb-8">
              <p className="text-xl md:text-2xl text-gray-900 font-semibold leading-snug">
                <span className="text-orange-500 font-bold">Comece agora</span>{" "}
                a estudar para concursos com{" "}
                <span className="text-orange-500 font-bold">
                  questões extraídas de provas anteriores
                </span>
                !
              </p>
            </div>
            <img
              src="/logo-large.svg"
              alt="Logo"
              className="mx-auto w-48 md:w-64 mb-8"
            />
          </section>

          <section className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Por que utilizar o Orange Cat Studies?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Transforme sua preparação com um sistema eficiente e
                inteligente. Com extração automática de provas anteriores,
                desafios diários personalizados e recompensas divertidas com
                tirinhas do Garfield, seus estudos ganham constância e leveza.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 border rounded-xl shadow bg-white transition hover:shadow-md">
                <p className="text-3xl font-bold text-orange-500 mb-4">01</p>
                <h3 className="text-lg font-semibold mb-2">
                  Extração Inteligente de Provas
                </h3>
                <p className="text-sm text-neutral-700">
                  Envie provas anteriores com gabaritos. O sistema extrai e
                  organiza automaticamente as questões, criando seu próprio
                  banco de estudos.
                </p>
              </div>

              <div className="p-4 border rounded-xl shadow bg-white transition hover:shadow-md">
                <p className="text-3xl font-bold text-orange-500 mb-4">02</p>
                <h3 className="text-lg font-semibold mb-2">
                  Desafios Diários Personalizados
                </h3>
                <p className="text-sm text-neutral-700">
                  Todos os dias, 10 questões são sorteadas do seu banco de
                  provas, oferecendo prática constante e baseada no conteúdo que
                  você inseriu.
                </p>
              </div>

              <div className="p-4 border rounded-xl shadow bg-white transition hover:shadow-md">
                <p className="text-3xl font-bold text-orange-500 mb-4">03</p>
                <h3 className="text-lg font-semibold mb-2">
                  Álbum de Figurinhas do Garfield
                </h3>
                <p className="text-sm text-neutral-700">
                  Com o avanço diário nos estudos, você desbloqueia tirinhas do
                  Garfield, formando um divertido álbum digital que acompanha
                  seu desempenho.
                </p>
              </div>
            </div>
          </section>
        </LayoutWrapper>

        <section className="bg-neutral-50 py-16 px-4">
          <LayoutWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <h2 className="text-lg font-bold mb-4">Perguntas Frequentes</h2>
                <p className="text-sm text-neutral-700">
                  Ainda tem dúvidas? Entre em contato pelo e-mail{" "}
                  <a
                    href="mailto:suporte@garfieldstudies.com"
                    className="text-orange-500 underline"
                  >
                    suporte@garfieldstudies.com
                  </a>
                  .
                </p>
              </div>

              <div className="md:col-span-2 space-y-3">
                {faqs.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg bg-white shadow-sm"
                  >
                    <button
                      className="w-full text-left p-3 font-medium flex justify-between items-center text-sm"
                      onClick={() => toggleFAQ(index)}
                    >
                      {item.question}
                      <span
                        className={`text-base ${
                          openIndex === index
                            ? "text-orange-500"
                            : "text-gray-700"
                        }`}
                      >
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="p-3 border-t text-sm text-neutral-700">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </LayoutWrapper>
        </section>
      </main>
      <Footer />
    </>
  );
}