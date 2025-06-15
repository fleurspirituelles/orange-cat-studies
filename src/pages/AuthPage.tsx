import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") || "login";
  const showLogin = type === "login";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/questions");
    }
  }, [navigate]);

  const handleSwitch = (target: "login" | "register") => {
    setSearchParams({ type: target });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-lg flex-1 hidden lg:flex h-full">
          <div className="my-auto">
            <h1 className="text-4xl font-bold mb-4">
              Bem-vinda(o) ao Orange Cat Studies!
            </h1>
            <p className="text-neutral-700">
              Transforme seus estudos para concursos em uma experiência
              interativa. Resolva desafios diários, extraia questões diretamente
              dos editais e acompanhe seu progresso com estatísticas detalhadas.
              E o melhor: desbloqueie tirinhas exclusivas do Garfield a cada dia
              de estudo.
            </p>
          </div>
        </div>
        <div className="w-full max-w-md mt-10 lg:mt-0 flex items-center">
          {showLogin ? (
            <LoginForm switchToRegister={() => handleSwitch("register")} />
          ) : (
            <RegisterForm switchToLogin={() => handleSwitch("login")} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}