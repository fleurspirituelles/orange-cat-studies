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

      <section className="bg-white px-6 pt-12 text-center">
        <div className="inline-block px-8 py-8 mx-auto bg-white max-w-3xl mb-16">
          <p className="text-3xl md:text-4xl text-gray-900 font-bold leading-tight">
            <span className="text-orange-500 font-extrabold">Comece agora</span>{" "}
            a estudar para concursos com{" "}
            <span className="text-orange-500 font-extrabold">
              questões extraídas de provas anteriores
            </span>
            !
          </p>
        </div>
        <img
          src="/logo-large.svg"
          alt="Logo"
          className="mx-auto w-64 md:w-80 mb-16"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Por que utilizar o Orange Cat Studies?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Transforme sua preparação com um sistema eficiente e inteligente.
            Com extração automática de provas anteriores, desafios diários
            personalizados e recompensas divertidas com tirinhas do Garfield,
            seus estudos ganham constância e leveza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 border rounded-2xl shadow bg-white transition hover:shadow-md">
            <p className="text-5xl font-bold text-orange-500 mb-6">01</p>
            <h3 className="text-xl font-semibold mb-4">
              Extração Inteligente de Provas
            </h3>
            <p className="text-base text-neutral-700">
              Envie provas anteriores com gabaritos. O sistema extrai e organiza
              automaticamente as questões, criando seu próprio banco de estudos.
            </p>
          </div>

          <div className="p-8 border rounded-2xl shadow bg-white transition hover:shadow-md">
            <p className="text-5xl font-bold text-orange-500 mb-6">02</p>
            <h3 className="text-xl font-semibold mb-4">
              Desafios Diários Personalizados
            </h3>
            <p className="text-base text-neutral-700">
              Todos os dias, 10 questões são sorteadas do seu banco de provas,
              oferecendo prática constante e baseada no conteúdo que você
              inseriu.
            </p>
          </div>

          <div className="p-8 border rounded-2xl shadow bg-white transition hover:shadow-md">
            <p className="text-5xl font-bold text-orange-500 mb-6">03</p>
            <h3 className="text-xl font-semibold mb-4">
              Álbum de Figurinhas do Garfield
            </h3>
            <p className="text-base text-neutral-700">
              Com o avanço diário nos estudos, você desbloqueia tirinhas do
              Garfield, formando um divertido álbum digital que acompanha seu
              desempenho.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            <p className="text-base text-neutral-700">
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

          <div className="md:col-span-2 space-y-4">
            {faqs.map((item, index) => (
              <div key={index} className="border rounded-xl bg-white shadow">
                <button
                  className="w-full text-left p-5 font-semibold flex justify-between items-center text-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  <span
                    className={`text-2xl ${
                      openIndex === index ? "text-orange-500" : "text-gray-700"
                    }`}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-5 border-t text-base text-neutral-700">
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