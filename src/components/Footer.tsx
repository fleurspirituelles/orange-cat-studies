export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-gray-100 text-sm text-gray-700 mt-16 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div>
          <div className="text-2xl mb-3">😺</div>
          <p className="mb-2">suporte@garfieldstudies.com</p>
          <p className="mb-2">+55 (XX) XXXXX-XXXX</p>
          <p className="mt-2">
            Apoio para sua jornada rumo à aprovação. Estude de onde quiser!
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
              <a href="#">Perguntas frequentes</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Redes sociais</h3>
          <div className="flex gap-3">
            <span>📘</span>
            <span>🐦</span>
            <span>💼</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 text-xs text-gray-500">
        © 2025 Orange Cat Studies. Todos os direitos reservados.
      </div>
    </footer>
  );
}