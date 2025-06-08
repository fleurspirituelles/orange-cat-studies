import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function AddExamPage() {
  const [form, setForm] = useState({
    exam_name: "",
    board: "",
    level: "",
    year: "",
    position: "",
  });

  const [examPdf, setExamPdf] = useState<File | null>(null);
  const [answerPdf, setAnswerPdf] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExamFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setExamPdf(e.target.files[0]);
  };

  const handleAnswerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setAnswerPdf(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user?.id_user) {
      alert("Usuário não identificado.");
      return;
    }

    const { exam_name, board, level, year, position } = form;

    if (
      !exam_name ||
      !board ||
      !level ||
      !year ||
      !position ||
      !examPdf ||
      !answerPdf
    ) {
      alert("Preencha todos os campos e selecione os arquivos.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/exams", {
        id_user: user.id_user,
        exam_name,
        board,
        level,
        year,
        position,
      });

      alert("Edital cadastrado com sucesso!");
    } catch (error: any) {
      alert("Erro ao cadastrar edital: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Cadastro de Editais
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            Preencha as informações do concurso e envie os arquivos da prova e
            do gabarito em PDF.
          </p>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Nome do concurso
              </label>
              <Input
                name="exam_name"
                value={form.exam_name}
                onChange={handleChange}
                placeholder="Ex: Tribunal de Justiça"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Banca organizadora
              </label>
              <Input
                name="board"
                value={form.board}
                onChange={handleChange}
                placeholder="Ex: VUNESP"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Nível do concurso
              </label>
              <Input
                name="level"
                value={form.level}
                onChange={handleChange}
                placeholder="Ex: Médio"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Ano
              </label>
              <Input
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="Ex: 2025"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Cargo
              </label>
              <Input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Ex: Escrevente Técnico Judiciário"
              />
            </div>
            <div>
              <div className="flex gap-4">
                <div className="w-1/2 text-center">
                  <label className="text-sm font-medium text-gray-700">
                    PDF da Prova
                  </label>
                </div>
                <div className="w-1/2 text-center">
                  <label className="text-sm font-medium text-gray-700">
                    PDF do Gabarito
                  </label>
                </div>
              </div>
              <div className="flex gap-4 mt-1">
                <div className="w-1/2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleExamFile}
                    className="hidden"
                    id="examFile"
                  />
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => document.getElementById("examFile")?.click()}
                  >
                    Selecionar Prova
                  </Button>
                  {examPdf && (
                    <p className="mt-1 text-xs text-gray-600 truncate text-center">
                      {examPdf.name}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleAnswerFile}
                    className="hidden"
                    id="answerFile"
                  />
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() =>
                      document.getElementById("answerFile")?.click()
                    }
                  >
                    Selecionar Gabarito
                  </Button>
                  {answerPdf && (
                    <p className="mt-1 text-xs text-gray-600 truncate text-center">
                      {answerPdf.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Button className="w-full" onClick={handleSubmit}>
                Avançar
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
