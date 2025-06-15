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
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between">
        <div className="max-w-lg mb-10 lg:mb-0">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">
            Bem-vinda(o) ao Orange Cat Studies!
          </h1>
          <p className="text-neutral-700 text-base lg:text-lg leading-relaxed">
            Organize sua preparação para concursos com um sistema inteligente de
            extração de questões a partir de provas anteriores. Resolva desafios
            diários e desbloqueie tirinhas exclusivas do Garfield como
            recompensa pela sua constância.
          </p>
        </div>

        <div className="w-full max-w-md flex items-center">
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