import { useState } from "react";
import { Upload, FileEdit, Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
import axios from "axios";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function AddExamPage() {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    board: "",
    year: "",
    position: "",
    examName: "",
    level: "",
  });

  const [status, setStatus] = useState("Selecione um PDF válido para iniciar.");
  const [loading, setLoading] = useState(false);

  const handleManualAdd = () => {
    navigate("/add-exam/manual");
  };

  const handlePdfUpload = () => {
    document.getElementById("pdfInput")?.click();
  };

  const detectInfo = async (text: string) => {
    const lower = text.toLowerCase();

    const board =
      /vunesp|fcc|fundação carlos chagas|caipimes|zambini|ibam|makinari|instituto mais|objetiva|consulplan|rbo|fapec|avançasp|ibfc/
        .exec(lower)?.[0]
        ?.toUpperCase() || "Banca não identificada";

    const year = /20\d{2}/.exec(text)?.[0] || "";

    const positionMatch = /cargo[s]? de ([A-ZÀ-Úa-zà-ú\s]+)/i.exec(text);
    const position = positionMatch?.[1]?.trim() || "";

    const nameMatch =
      /(TRIBUNAL DE JUSTIÇA DO ESTADO DE .+?|MINISTÉRIO PÚBLICO DO ESTADO DE .+?|PREFEITURA MUNICIPAL DE .+?|GOVERNO DO ESTADO DE .+?|CÂMARA MUNICIPAL DE .+?)(\n|$|EDITAL)/i.exec(
        text
      );
    const examName = nameMatch?.[1]?.trim() || "Concurso não identificado";

    let level = "Não identificado";
    if (/estado|estadual/i.test(text)) level = "Estadual";
    else if (/município|municipal|prefeitura|câmara municipal/i.test(text))
      level = "Municipal";
    else if (/união|ministério|federal/i.test(text)) level = "Federal";

    const updatedInfo = { board, year, position, examName, level };
    setInfo(updatedInfo);
    setStatus("Extração concluída.");

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user.id_user) return alert("Usuário não encontrado.");

    try {
      await axios.post("http://localhost:5000/exams", {
        id_user: user.id_user,
        exam_name: updatedInfo.examName,
        board: updatedInfo.board,
        level: updatedInfo.level,
        year: updatedInfo.year,
        position: updatedInfo.position,
      });
      alert("Edital salvo com sucesso!");
    } catch (error) {
      alert("Erro ao salvar o edital.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("Analisando o conteúdo do arquivo...");
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const typedarray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

      let fullText = "";

      for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map((item: any) => item.str).join(" ");
        fullText += text + " ";
      }

      await detectInfo(fullText);
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 rounded-md px-3 py-2 bg-white border border-gray-200 text-sm text-gray-700">
      <Check className="text-orange-500 w-4 h-4" />
      <span>{text}</span>
    </div>
  );

  return (
    <>
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
          <div className="bg-white rounded-xl border border-gray-200 flex flex-col justify-between min-h-[520px]">
            <div>
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
                  onChange={handleFileChange}
                />
                <p className="text-xs text-center text-gray-500 mt-3">
                  {loading ? "Extraindo informações..." : status}
                </p>
                {(info.examName ||
                  info.board ||
                  info.year ||
                  info.position) && (
                  <div className="mt-4 text-sm text-gray-800 space-y-1">
                    <p>
                      <strong>Nome do concurso:</strong> {info.examName}
                    </p>
                    <p>
                      <strong>Nível:</strong> {info.level}
                    </p>
                    <p>
                      <strong>Banca:</strong> {info.board}
                    </p>
                    <p>
                      <strong>Ano:</strong> {info.year}
                    </p>
                    <p>
                      <strong>Cargo:</strong> {info.position}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col justify-between min-h-[520px]">
            <div>
              <div className="bg-orange-50 rounded-t-xl px-6 py-3 border-b border-gray-200 text-sm font-semibold text-gray-800">
                Adicionar manualmente
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-6">
                  Preencha as informações do edital com total controle sobre
                  cada etapa.
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
        </div>
      </main>
      <Footer />
    </>
  );
}
