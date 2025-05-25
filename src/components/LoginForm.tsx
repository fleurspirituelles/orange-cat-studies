import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { auth, googleProvider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios";

interface LoginFormProps {
  switchToRegister: () => void;
}

const API_URL = "http://localhost:5000";

export default function LoginForm({ switchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha o e-mail e a senha.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Digite um e-mail válido.");
      return;
    }

    if (password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const response = await axios.get(`${API_URL}/users/email/${user.email}`);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (error: any) {
      const code = error.code;
      const messages: { [key: string]: string } = {
        "auth/invalid-email": "E-mail inválido.",
        "auth/user-not-found": "Usuário não encontrado.",
        "auth/wrong-password": "Senha incorreta.",
      };
      alert(messages[code] || "Erro ao fazer login.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await axios.get(`${API_URL}/users/email/${user.email}`);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Entrar</h2>
      <p className="text-sm text-center text-muted-foreground mb-6">
        Bem-vindo(a) de volta! Acesse sua conta para continuar.
      </p>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">E-mail</label>
          <Input
            placeholder="Digite seu e-mail."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Senha</label>
          <div className="relative">
            <Input
              placeholder="Digite sua senha."
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute right-3 top-3 cursor-pointer">
              {showPassword ? (
                <EyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
        </div>
        <div className="text-right text-sm text-muted-foreground mb-1">
          <a href="#" className="hover:underline">
            Esqueceu sua senha?
          </a>
        </div>
        <div className="text-xs text-muted-foreground mb-2">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="underline">
            Termos e Políticas de Privacidade
          </a>
          .
        </div>
        <Button className="w-full" onClick={handleLogin}>
          Entrar
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <img src="/google-icon.svg" alt="Google" className="h-4 w-4 mr-2" />
          Entrar com Google
        </Button>
        <p className="text-sm text-center">
          Não tem uma conta?{" "}
          <span
            className="underline text-orange-500 cursor-pointer font-medium"
            onClick={switchToRegister}
          >
            Cadastre-se!
          </span>
        </p>
      </div>
    </div>
  );
}
