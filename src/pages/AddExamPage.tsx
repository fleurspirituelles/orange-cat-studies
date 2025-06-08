import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.id_user) {
      alert("Usuário não identificado.");
      return;
    }

    const { exam_name, board, level, year, position } = form;
    if (!exam_name || !board || !level || !year || !position) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/exams", {
        id_user: user.id_user,
        exam_name,
        board,
        level,
        year,
        position,
      });
      const id_exam = res.data.id_exam;
      navigate(`/add-question?id_exam=${id_exam}`);
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
            Cadastro de Provas
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            Preencha as informações do concurso.
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