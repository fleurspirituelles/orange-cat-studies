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
    <nav className="flex items-center justify-between px-6 py-3 bg-orange-500 text-white">
      <span className="font-bold text-lg">😺</span>

      <ul className="flex gap-4 text-sm font-medium">
        <li>
          <a href="#">Questões</a>
        </li>
        <li>
          <a href="#">Editais</a>
        </li>
        <li>
          <a href="#">Álbuns</a>
        </li>
        <li>
          <a href="#">Estatísticas</a>
        </li>
      </ul>

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
            <Button variant="outline" onClick={() => setFormType?.("register")}>
              Cadastrar-se
            </Button>
            <Button onClick={() => setFormType?.("login")}>Entrar</Button>
          </>
        )}
      </div>
    </nav>
  );
}