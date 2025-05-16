import { Button } from "./ui/Button";

interface NavbarProps {
  setFormType: (type: "login" | "register") => void;
}

export default function Navbar({ setFormType }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-orange-500 text-white">
      <span className="font-bold text-lg">😺</span>
      <ul className="flex gap-4">
        <li>
          <button onClick={() => setFormType("login")}>Início</button>
        </li>
        <li>
          <button onClick={() => setFormType("login")}>Questões</button>
        </li>
        <li>
          <button onClick={() => setFormType("login")}>Editais</button>
        </li>
        <li>
          <button onClick={() => setFormType("login")}>Álbuns</button>
        </li>
        <li>
          <button onClick={() => setFormType("login")}>Estatísticas</button>
        </li>
      </ul>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setFormType("register")}>
          Cadastrar-se
        </Button>
        <Button onClick={() => setFormType("login")}>Entrar</Button>
      </div>
    </nav>
  );
}