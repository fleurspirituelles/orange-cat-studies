import { Upload, FileEdit, Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AddExamPage() {
  const navigate = useNavigate();

  const handleManualAdd = () => {
    navigate("/add-exam/manual");
  };

  const handlePdfUpload = () => {
    document.getElementById("pdfInput")?.click();
  };

  const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 rounded-md px-3 py-2 bg-white border border-gray-200 text-sm text-gray-700">
      <Check className="text-orange-500 w-4 h-4" />
      <span>{text}</span>
    </div>
  );

  return (
    <>
      <div className="w-full bg-orange-500 py-2 text-white text-sm font-medium text-center">
        Checar álbuns! →
      </div>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Adicione um novo edital!
          </h1>
          <p className="text-gray-700 text-sm md:text-base max-w-2xl mx-auto">
            Escolha abaixo como deseja adicionar seu edital. Você pode carregar
            um arquivo PDF com a prova e o gabarito, e o sistema fará a extração
            automática das questões, ou, se preferir, inserir os dados
            manualmente preenchendo as informações como banca organizadora,
            nível do concurso, cargo e outras.
          </p>
          <hr className="my-12 border-gray-300" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card PDF */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="bg-orange-50 rounded-t-xl px-6 py-3 border-b border-gray-200 text-sm font-semibold text-gray-800">
              Upload de PDF
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                Envie o edital em PDF e deixe que o sistema cuide da extração
                das questões para você.
              </p>
              <div className="space-y-2 mb-6">
                <FeatureItem text="Extração automática de questões e gabaritos." />
                <FeatureItem text="Identificação de banca, ano e disciplina." />
                <FeatureItem text="Associação das questões a temas específicos." />
                <FeatureItem text="Verificação automática de inconsistências." />
                <FeatureItem text="Visualização do conteúdo antes da finalização." />
              </div>
              <Button
                className="w-full flex items-center justify-center gap-2"
                onClick={handlePdfUpload}
              >
                <Upload className="h-4 w-4" />
                Selecionar PDF
              </Button>
              <input
                type="file"
                accept=".pdf"
                id="pdfInput"
                className="hidden"
              />
            </div>
          </div>

          {/* Card Manual */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="bg-orange-50 rounded-t-xl px-6 py-3 border-b border-gray-200 text-sm font-semibold text-gray-800">
              Adicionar manualmente
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                Preencha as informações do edital com total controle sobre cada
                etapa.
              </p>
              <div className="space-y-2 mb-6">
                <FeatureItem text="Inserção manual de banca, nível e disciplinas." />
                <FeatureItem text="Cadastro de questões individualmente." />
                <FeatureItem text="Associação direta aos temas do sistema." />
                <FeatureItem text="Indicação de questões para o desafio diário." />
                <FeatureItem text="Visualização das informações inseridas." />
              </div>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleManualAdd}
              >
                <FileEdit className="h-4 w-4" />
                Começar preenchimento
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}