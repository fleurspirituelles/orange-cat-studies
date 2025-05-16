export default function Footer() {
  return (
    <footer className="px-6 py-10 bg-gray-100 text-sm text-gray-700 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div>
          <div className="text-2xl mb-2">😺</div>
          <p className="mb-2">suporte@garfieldstudies.com</p>
          <p className="mb-2">+55 (XX) XXXXX-XXXX</p>
          <p>
            Apoio para sua jornada rumo à aprovação - estude de onde quiser!
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Início</h3>
          <ul className="space-y-1">
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
        </div>
        <div>
          <h3 className="font-semibold mb-2">Sobre</h3>
          <ul className="space-y-1">
            <li>
              <a href="#">Por que utilizar</a>
            </li>
            <li>
              <a href="#">Perguntas Frequentes</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Redes Sociais</h3>
          <div className="flex gap-2">
            <a href="#">
              <span>📘</span>
            </a>
            <a href="#">
              <span>🐦</span>
            </a>
            <a href="#">
              <span>💼</span>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center mt-6">
        © 2025 Orange Cat Studies. Todos os direitos reservados.
      </p>
    </footer>
  );
}
