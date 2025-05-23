import React from "react";
import { Button } from "../components/ui/Button";
import { Upload, FileEdit } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function AddExamPage() {
  const navigate = useNavigate();

  const handleManualAdd = () => {
    navigate("/add-exam/manual");
  };

  const handlePdfUpload = () => {
    document.getElementById("pdfInput")?.click();
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-orange-600 mb-2 text-center">
          Adicione um novo edital!
        </h1>
        <p className="text-md text-gray-700 text-center mb-12">
          Escolha abaixo como deseja adicionar seu edital...
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-bold text-orange-600 mb-2">
              Upload de PDF
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Envie o edital em PDF e deixe que o sistema cuide da extração das
              questões para você.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-6">
              <li>Extração automática de questões e gabaritos</li>
              <li>Identificação de banca, ano e disciplina</li>
              <li>Associação das questões a temas específicos</li>
              <li>Verificação automática de inconsistências</li>
              <li>Visualização do conteúdo antes da finalização</li>
            </ul>
            <Button
              className="w-full flex items-center gap-2"
              onClick={handlePdfUpload}
            >
              <Upload className="h-4 w-4" />
              Selecionar PDF
            </Button>
            <input type="file" accept=".pdf" id="pdfInput" className="hidden" />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-bold text-orange-600 mb-2">
              Adicionar manualmente
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Preencha as informações do edital com total controle sobre cada
              etapa.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-6">
              <li>Inserção manual de banca, nível e disciplinas</li>
              <li>Cadastro de questões individualmente</li>
              <li>Associação direta aos temas do sistema</li>
              <li>Indicação de questões para o desafio diário</li>
              <li>Visualização das informações inseridas</li>
            </ul>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleManualAdd}
            >
              <FileEdit className="h-4 w-4" />
              Começar preenchimento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
