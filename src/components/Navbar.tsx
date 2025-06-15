import { useState } from "react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { label: "Início", path: "/" },
    { label: "Nova Prova", path: "/add-exam" },
    { label: "Nova Questão", path: "/add-question" },
    { label: "Resolver", path: "/questions" },
    { label: "Álbum de Tirinhas", path: "/comics" },
  ];

  return (
    <>
      {!user && (
        <div className="w-full bg-orange-500 px-4 py-2 text-white text-sm font-medium text-center">
          Cadastre-se agora!
        </div>
      )}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
          <div className="flex items-center gap-6">
            <div
              className="text-2xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              😺
            </div>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center gap-8 text-sm">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="hover:text-orange-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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
            <button
              onClick={toggleMenu}
              className="lg:hidden focus:outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden px-4 pb-4">
            <nav className="flex flex-col gap-4 text-sm">
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}