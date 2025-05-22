import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { auth, googleProvider } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios";

interface RegisterFormProps {
  switchToLogin: () => void;
}

const API_URL = "http://localhost:5000";

export default function RegisterForm({ switchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      await axios.post(`${API_URL}/auth`, {
        name: fullName,
        email: user.email,
      });

      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await axios.post(`${API_URL}/auth`, {
        name: user.displayName,
        email: user.email,
      });

      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-md w-full">
      <div className="space-y-2 text-center mb-6">
        <h2 className="text-2xl font-bold">Registrar</h2>
        <p className="text-sm">
          Crie sua conta para entrar no Orange Cat Studies.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Nome completo</label>
        <Input
          placeholder="Digite seu nome completo."
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label className="block text-sm font-medium mt-4">E-mail</label>
        <Input
          placeholder="Digite seu e-mail."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mt-4">Senha</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Crie uma senha forte."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2/4 -translate-y-2/4"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="block text-sm font-medium mt-4">
          Confirmar senha
        </label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2/4 -translate-y-2/4"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button className="w-full mt-2" onClick={handleRegister}>
          Registrar
        </Button>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm">OU</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleRegister}
        >
          <img src="/google-icon.svg" className="w-4 h-4 mr-2" />
          Registrar com Google
        </Button>

        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <button onClick={switchToLogin} className="underline font-semibold">
            Faça login aqui!
          </button>
        </p>
      </div>
    </div>
  );
}