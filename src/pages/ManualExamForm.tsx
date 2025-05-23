import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

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
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          Cadastro Manual de Edital
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Preencha os campos abaixo com as informações do edital desejado.
        </p>

        <div className="space-y-4">
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
          <Button className="w-full mt-6">Avançar</Button>
        </div>
      </div>
    </div>
  );
}