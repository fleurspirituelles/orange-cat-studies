import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ManualExamForm() {
  const [form, setForm] = useState({
    name: "",
    board: "",
    level: "",
    year: "",
    role: "",
    subjects: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-2 text-center">
            Cadastro Manual de Edital
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            Preencha os campos abaixo com as informações do edital desejado.
          </p>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Nome do concurso
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex: Tribunal de Justiça"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
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
              <label className="text-sm font-medium mb-1 block">
                Nível do concurso
              </label>
              <Input
                name="level"
                value={form.level}
                onChange={handleChange}
                placeholder="Ex: Estadual"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Ano</label>
              <Input
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="Ex: 2025"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Cargo</label>
              <Input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Ex: Escrevente Técnico Judiciário"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Disciplinas (separadas por vírgula)
              </label>
              <Input
                name="subjects"
                value={form.subjects}
                onChange={handleChange}
                placeholder="Ex: Português, Informática, RLM"
              />
            </div>
            <div className="pt-2">
              <Button className="w-full">Avançar</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}