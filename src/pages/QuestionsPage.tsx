import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function QuestionsPage() {
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
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Escrevente Técnico Judiciário – TJ/SP (Vunesp/2021)
                </h2>
                <p className="text-sm text-gray-700">
                  Na gaveta de camisetas de Jeferson há 5 camisetas pretas, 7
                  camisetas vermelhas e 9 camisetas azuis. O menor número de
                  camisetas que Jeferson precisará retirar da gaveta, de maneira
                  aleatória e sem saber quais camisetas estão saindo, para ter
                  certeza de ter retirado pelo menos uma camiseta preta e uma
                  camiseta azul, é:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {["16.", "17.", "14.", "18.", "20."].map((alt, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg border px-4 py-4 text-sm font-medium ${
                        idx === 2
                          ? "bg-orange-500 text-white"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      <span className="block font-bold mb-1">
                        {String.fromCharCode(65 + idx)})
                      </span>
                      {alt}
                    </div>
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