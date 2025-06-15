import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {!user && (
        <div className="w-full bg-orange-500 px-4 py-2 text-white text-sm font-medium text-center">
          Cadastre-se agora!
        </div>
      )}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8">
            <div className="flex items-center mb-3 md:mb-0">
              <div className="text-2xl">😺</div>
            </div>
            <nav className="flex flex-col md:flex-row md:gap-8 text-sm text-center">
              <a href="/" className="hover:text-orange-500">
                Início
              </a>
              <a href="/add-exam" className="hover:text-orange-500">
                Adicionar Prova
              </a>
              <a href="/add-question" className="hover:text-orange-500">
                Adicionar Questão
              </a>
              <a href="/questions" className="hover:text-orange-500">
                Resolver Questões
              </a>
              <a href="/comics" className="hover:text-orange-500">
                Álbuns de Figurinhas
              </a>
            </nav>
          </div>

          <div className="flex justify-center md:justify-end gap-2 items-center mt-3 md:mt-0">
            {user ? (
              <>
                <span className="text-sm font-semibold hidden sm:block">
                  {user.displayName || user.name}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth?type=register")}
                >
                  Cadastrar-se
                </Button>
                <Button onClick={() => navigate("/auth?type=login")}>
                  Entrar
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}