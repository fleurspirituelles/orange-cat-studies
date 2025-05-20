import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  setFormType?: (type: "login" | "register") => void;
}

export default function Navbar({ setFormType }: NavbarProps) {
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
          Inscreva-se agora!
        </div>
      )}

      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="mb-3 text-2xl">😺</div>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="#" className="hover:text-orange-500">
                Questões
              </a>
              <a href="#" className="hover:text-orange-500">
                Editais
              </a>
              <a href="#" className="hover:text-orange-500">
                Álbuns
              </a>
              <a href="#" className="hover:text-orange-500">
                Estatísticas
              </a>
            </nav>
          </div>
          <div className="flex gap-2 items-center">
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
                  onClick={() => setFormType?.("register")}
                >
                  Cadastrar-se
                </Button>
                <Button onClick={() => setFormType?.("login")}>Entrar</Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
