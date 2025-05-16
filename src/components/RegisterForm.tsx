import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface RegisterFormProps {
  switchToLogin: () => void;
}

export default function RegisterForm({ switchToLogin }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-md w-full">
      <div className="space-y-2 text-center mb-6">
        <h2 className="text-2xl font-bold">Cadastrar</h2>
        <p className="text-sm text-gray-500">
          Crie sua conta e transforme sua preparação para concursos em uma
          experiência interativa!
        </p>
      </div>
      <div className="space-y-4">
        <label className="text-sm font-medium">Nome completo</label>
        <Input
          placeholder="Digite seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm font-medium">E-mail</label>
        <Input
          placeholder="Digite seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium">Senha</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Crie uma senha segura"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="text-sm font-medium">Confirmação de senha</label>
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-500"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="text-xs text-gray-500">
          <input type="checkbox" className="mr-2" />
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="underline">
            Termos
          </a>{" "}
          e{" "}
          <a href="#" className="underline">
            Políticas de Privacidade
          </a>
          .
        </div>

        <Button className="w-full mt-2">Criar conta</Button>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400">OU</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <Button variant="outline" className="w-full">
          <img src="/google-icon.svg" className="w-4 h-4 mr-2" />
          Cadastrar-se com Google
        </Button>

        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <button onClick={switchToLogin} className="underline font-semibold">
            Faça login!
          </button>
        </p>
      </div>
    </div>
  );
}