import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Home() {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <>
      <Navbar setFormType={setFormType} />
      <div className="flex flex-col lg:flex-row justify-between items-start max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-4">
            Bem-vinda(o) ao Orange Cat Studies!
          </h1>
          <p className="text-gray-700">
            Transforme seus estudos para concursos em uma experiência
            interativa! Resolva desafios diários, extraia questões diretamente
            dos editais e acompanhe seu progresso com estatísticas detalhadas. E
            o melhor: desbloqueie tirinhas exclusivas do Garfield a cada dia de
            estudo!
          </p>
        </div>
        <div className="w-full max-w-md mt-10 lg:mt-0">
          {formType === "login" ? (
            <LoginForm switchToRegister={() => setFormType("register")} />
          ) : (
            <RegisterForm switchToLogin={() => setFormType("login")} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}