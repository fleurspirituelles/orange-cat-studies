import { Input } from "./ui/Input";
import React from "react";

export interface ExamFormData {
  exam_name: string;
  board: string;
  level: string;
  year: string;
  position: string;
}

interface ExamFormProps {
  form: ExamFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ExamForm({ form, onChange }: ExamFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome do concurso
        </label>
        <Input
          name="exam_name"
          value={form.exam_name}
          onChange={onChange}
          placeholder="Ex: Tribunal de Justiça do Estado de São Paulo"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banca organizadora
        </label>
        <Input
          name="board"
          value={form.board}
          onChange={onChange}
          placeholder="Ex: VUNESP"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nível do concurso
        </label>
        <Input
          name="level"
          value={form.level}
          onChange={onChange}
          placeholder="Ex: Ensino Médio"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ano
        </label>
        <Input
          name="year"
          value={form.year}
          onChange={onChange}
          placeholder="Ex: 2025"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cargo
        </label>
        <Input
          name="position"
          value={form.position}
          onChange={onChange}
          placeholder="Ex: Escrevente Técnico Judiciário"
        />
      </div>
    </div>
  );
}