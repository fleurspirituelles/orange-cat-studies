export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-gray-100 text-sm text-gray-700 mt-16 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-x-10 items-start text-xs md:text-sm">
        <div className="col-span-2">
          <div className="mb-3 text-2xl">😺</div>
          <p className="mb-2">suporte@garfieldstudies.com</p>
          <p className="mb-2">+55 (XX) XXXXX-XXXX</p>
          <p className="mt-2">
            Acompanhe sua jornada de estudos com organização, constância e
            recompensas diárias. Estude de onde quiser.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Navegação</h3>
          <ul className="space-y-1">
            <li>
              <a href="/">Início</a>
            </li>
            <li>
              <a href="/add-exam">Nova Prova</a>
            </li>
            <li>
              <a href="/add-question">Nova Questão</a>
            </li>
            <li>
              <a href="/questions">Resolver</a>
            </li>
            <li>
              <a href="/comics">Álbum de Tirinhas</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sobre</h3>
          <ul className="space-y-1">
            <li>
              <a href="/#como-funciona">Como funciona</a>
            </li>
            <li>
              <a href="/#faq">Perguntas Frequentes</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Redes Sociais</h3>
          <div className="flex gap-3">
            <img src="/figma-icon.svg" className="w-4 h-4" alt="Figma" />
            <img src="/github-icon.svg" className="w-4 h-4" alt="GitHub" />
            <img src="/twitch-icon.svg" className="w-4 h-4" alt="Twitch" />
          </div>
        </div>
      </div>

      <div className="text-center mt-14 text-xs text-gray-500 leading-snug">
        <p>© 2025 Orange Cat Studies. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}