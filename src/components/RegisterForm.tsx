import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { auth, googleProvider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { syncUser } from "../lib/syncUser";

interface RegisterFormProps {
  switchToLogin: () => void;
}

export default function RegisterForm({ switchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (fullName.trim().length < 3) {
      alert("O nome deve ter pelo menos 3 caracteres.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Digite um e-mail válido.");
      return;
    }
    if (password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
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
      const syncedUser = await syncUser(fullName, user.email || "");
      localStorage.setItem("user", JSON.stringify(syncedUser));
      window.location.href = "/";
    } catch (error: any) {
      const code = error.code;
      const messages: { [key: string]: string } = {
        "auth/email-already-in-use": "Este e-mail já está cadastrado.",
        "auth/invalid-email": "E-mail inválido.",
        "auth/weak-password": "A senha é muito fraca.",
      };
      alert(messages[code] || "Erro ao criar conta.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const syncedUser = await syncUser(
        user.displayName || "Sem Nome",
        user.email || ""
      );
      localStorage.setItem("user", JSON.stringify(syncedUser));
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 py-2 rounded-xl bg-white shadow-md">
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
            placeholder="Informe seu nome completo."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">E-mail</label>
          <Input
            placeholder="Informe seu e-mail."
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
        <div className="text-sm text-muted-foreground mb-2">
          Ao continuar, você concorda com nossos{" "}
          <a href="/" className="underline">
            Termos e Políticas de Privacidade
          </a>
          .
        </div>
        <Button className="w-full" onClick={handleRegister}>
          Criar conta
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleRegister}
        >
          <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
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