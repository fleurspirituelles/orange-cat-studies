import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface LoginFormProps {
  switchToRegister: () => void;
}

export default function LoginForm({ switchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-md w-full">
      <div className="space-y-2 text-center mb-6">
        <h2 className="text-2xl font-bold">Entrar</h2>
        <p className="text-sm text-gray-500">
          Acesse sua conta e continue sua jornada de estudos com o Garfield!
        </p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">E-mail</label>
        <Input
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium">Senha</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
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

        <div className="flex justify-between text-xs text-gray-500">
          <div>
            <input type="checkbox" className="mr-2" />
            Lembrar de mim
          </div>
          <a href="#" className="underline">
            Esqueci minha senha
          </a>
        </div>

        <Button className="w-full mt-2">Entrar</Button>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400">OU</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <Button variant="outline" className="w-full">
          <img src="/google-icon.svg" className="w-4 h-4 mr-2" />
          Entrar com Google
        </Button>

        <p className="text-center text-sm mt-4">
          Não tem uma conta?{" "}
          <button
            onClick={switchToRegister}
            className="underline font-semibold"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}