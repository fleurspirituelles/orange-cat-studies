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
        "As questões são extraídas automaticamente das provas e gabaritos enviados pelo próprio usuário, garantindo uma preparação personalizada e direcionada.",
    },
    {
      question: "Posso enviar minhas próprias provas?",
      answer:
        "Sim. O sistema permite o envio de provas anteriores e seus respectivos gabaritos, que serão processados e transformados automaticamente em questões para estudo.",
    },
    {
      question: "Quantas questões preciso resolver por dia?",
      answer:
        "O desafio diário disponibiliza 10 questões por dia, selecionadas aleatoriamente a partir do banco de dados gerado com as provas enviadas.",
    },
    {
      question: "Como funcionam as recompensas das tirinhas do Garfield?",
      answer:
        "A cada sequência diária de estudo e resolução de questões, novas tirinhas do Garfield são desbloqueadas como forma de incentivo à constância e ao progresso.",
    },
    {
      question: "É possível visualizar todas as tirinhas já desbloqueadas?",
      answer:
        "Sim. As tirinhas conquistadas ficam armazenadas no seu álbum, que pode ser acessado a qualquer momento para acompanhar sua coleção.",
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

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Por que utilizar o Orange Cat Studies?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            O Orange Cat Studies transforma a preparação para concursos em uma
            experiência organizada e eficiente. Com extração automatizada de
            provas anteriores, desafios diários e sistema de recompensas, seus
            estudos tornam-se mais direcionados e motivadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 border rounded-2xl shadow bg-white transition hover:shadow-md">
            <p className="text-5xl font-bold text-orange-500 mb-6">01</p>
            <h3 className="text-xl font-semibold mb-4">
              Extração Inteligente de Provas
            </h3>
            <p className="text-base text-neutral-700">
              Envie provas anteriores e seus respectivos gabaritos. O sistema
              realiza a extração automatizada das questões e organiza o conteúdo
              de forma estruturada para seus estudos.
            </p>
          </div>

          <div className="p-8 border rounded-2xl shadow bg-white transition hover:shadow-md">
            <p className="text-5xl font-bold text-orange-500 mb-6">02</p>
            <h3 className="text-xl font-semibold mb-4">
              Desafios Diários Personalizados
            </h3>
            <p className="text-base text-neutral-700">
              Diariamente, são disponibilizadas 10 questões selecionadas a
              partir do banco gerado pelas provas enviadas, proporcionando uma
              preparação direcionada e consistente.
            </p>
          </div>

          <div className="p-8 border rounded-2xl shadow bg-white transition hover:shadow-md">
            <p className="text-5xl font-bold text-orange-500 mb-6">03</p>
            <h3 className="text-xl font-semibold mb-4">
              Álbum de Tirinhas do Garfield
            </h3>
            <p className="text-base text-neutral-700">
              Estude com constância e desbloqueie tirinhas exclusivas do
              Garfield como forma de incentivo e acompanhamento da sua evolução.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-16">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            <p className="text-base text-neutral-700">
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