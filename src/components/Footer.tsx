export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-gray-100 text-sm text-gray-700 mt-16 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-12 items-start">
        <div className="md:col-span-2 max-w-full">
          <div className="mb-3 text-2xl">😺</div>
          <p className="mb-2">suporte@garfieldstudies.com</p>
          <p className="mb-2">+55 (XX) XXXXX-XXXX</p>
          <p className="mt-2">
            Apoio para sua jornada rumo à aprovação – estude de onde quiser!
          </p>
        </div>

        <div className="md:col-span-1 min-w-[140px]">
          <h3 className="font-semibold mb-2">Navegação</h3>
          <ul className="space-y-1">
            <li>
              <a href="/">Início</a>
            </li>
            <li>
              <a href="#">Questões</a>
            </li>
            <li>
              <a href="/add-exam">Editais</a>
            </li>
            <li>
              <a href="#">Álbuns</a>
            </li>
            <li>
              <a href="#">Estatísticas</a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1 min-w-[140px]">
          <h3 className="font-semibold mb-2">Sobre</h3>
          <ul className="space-y-1">
            <li>
              <a href="/#por-que-utilizar">Por que utilizar?</a>
            </li>
            <li>
              <a href="/#faq">Perguntas frequentes</a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1 min-w-[140px]">
          <h3 className="font-semibold mb-2">Redes Sociais</h3>
          <div className="flex gap-3">
            <img src="/figma-icon.svg" className="w-4 h-4" />
            <img src="/github-icon.svg" className="w-4 h-4" />
            <img src="/twitch-icon.svg" className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="text-center mt-14 text-xs text-gray-500 leading-snug">
        <p>© 2025 Orange Cat Studies.</p>
        <p>Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}