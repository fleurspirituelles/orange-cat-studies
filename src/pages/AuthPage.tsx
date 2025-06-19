import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "login";
  const showLogin = type === "login";

  const handleSwitch = (target: "login" | "register") => {
    setSearchParams({ type: target });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-lg w-full">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">
              Bem-vinda(o) ao Orange Cat Studies!
            </h1>
            <p className="text-neutral-700 text-base lg:text-lg leading-relaxed">
              Organize sua preparação para concursos com um sistema inteligente
              de extração de questões a partir de provas anteriores. Resolva
              desafios diários e desbloqueie tirinhas exclusivas do Garfield
              como recompensa pela sua constância.
            </p>
          </div>

          <div className="w-full max-w-md self-start">
            {showLogin ? (
              <LoginForm switchToRegister={() => handleSwitch("register")} />
            ) : (
              <RegisterForm switchToLogin={() => handleSwitch("login")} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}