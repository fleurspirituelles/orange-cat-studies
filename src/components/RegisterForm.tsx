import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { auth, googleProvider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
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
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: fullName });
      }
      const user = result.user;

      const response = await axios.post(`${API_URL}/auth`, {
        name: fullName,
        email: user.email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await axios.post(`${API_URL}/auth`, {
        name: user.displayName,
        email: user.email,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Cadastrar</h2>
      <p className="text-sm text-center text-muted-foreground mb-6">
        Crie sua conta e transforme sua preparação para concursos em uma
        experiência interativa!
      </p>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Nome completo
          </label>
          <Input
            placeholder="Digite seu nome completo."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">E-mail</label>
          <Input
            placeholder="Digite seu melhor e-mail."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Senha</label>
          <div className="relative">
            <Input
              placeholder="Crie uma senha segura."
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
        <div>
          <label className="text-sm font-medium mb-1 block">
            Confirmação de senha
          </label>
          <div className="relative">
            <Input
              placeholder="Confirme sua senha."
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="absolute right-3 top-3 cursor-pointer">
              {showConfirmPassword ? (
                <EyeOff onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <Eye onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </div>
        </div>
        <Button className="w-full" onClick={handleRegister}>
          Criar conta
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleRegister}
        >
          <img src="/google-icon.svg" alt="Google" className="h-4 w-4 mr-2" />
          Cadastrar-se com Google
        </Button>
        <p className="text-sm text-center">
          Já tem uma conta?{" "}
          <span
            className="underline text-orange-500 cursor-pointer font-medium"
            onClick={switchToLogin}
          >
            Faça login!
          </span>
        </p>
      </div>
    </div>
  );
}