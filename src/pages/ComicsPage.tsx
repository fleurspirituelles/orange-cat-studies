import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Comic {
  id_comic: number;
  id_user: number;
  comic_date: string;
  image_url: string;
}

export default function ComicsPage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [groups, setGroups] = useState<Record<string, Comic[]>>({});

  const [modalOpen, setModalOpen] = useState(false);
  const [modalComics, setModalComics] = useState<Comic[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;
    const user = JSON.parse(stored);
    axios
      .get<Comic[]>(`http://localhost:5000/comics/user/${user.id_user}`)
      .then((res) => {
        setComics(res.data);
        const g: Record<string, Comic[]> = {};
        res.data.forEach((c) => {
          const ym = c.comic_date.slice(0, 7);
          (g[ym] ||= []).push(c);
        });
        setGroups(g);
      })
      .catch(console.error);
  }, []);

  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  function openCarousel(list: Comic[]) {
    setModalComics(list);
    setCurrentIdx(0);
    setModalOpen(true);

    const stored = localStorage.getItem("user");
    if (!stored) return;
    const user = JSON.parse(stored);
    Promise.all(
      list.map((c) =>
        axios
          .get<{ count: number }>(
            `http://localhost:5000/answers/count/${user.id_user}/${c.comic_date}`
          )
          .then((r) => r.data.count)
          .catch(() => 0)
      )
    ).then((arr) => setCounts(arr));
  }

  function closeCarousel() {
    setModalOpen(false);
  }

  function prev() {
    setCurrentIdx((i) => Math.max(0, i - 1));
  }

  function next() {
    setCurrentIdx((i) => Math.min(modalComics.length - 1, i + 1));
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Álbuns de Tirinhas</h1>
          <p className="text-gray-700 mb-8">
            Colecione tirinhas do Garfield como recompensas diárias ao concluir
            seus desafios! Acompanhe seu progresso mês a mês, desbloqueie novas
            tirinhas e complete seu álbum de figurinhas digital.
          </p>
          <div className="space-y-8">
            {Object.entries(groups).map(([ym, list]) => {
              const [year, month] = ym.split("-");
              const daysInMonth = new Date(+year, +month, 0).getDate();
              const start = `01/${month}`;
              const end = `${daysInMonth}/${month}`;
              const mName = monthNames[+month - 1];
              return (
                <div key={ym} className="bg-white border rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {start} – {end}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Veja as tirinhas que você desbloqueou em {mName}.
                        Continue firme e volte todos os dias para completar o
                        álbum!
                      </p>
                    </div>
                    <button
                      onClick={() => openCarousel(list)}
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Ver tirinhas
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {list.slice(-2).map((c) => {
                      const date = new Date(c.comic_date).toLocaleDateString(
                        "pt-BR"
                      );
                      return (
                        <img
                          key={c.id_comic}
                          src={c.image_url}
                          alt={`Tirinha de ${date}`}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "/images/placeholder-comic.png";
                          }}
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-4 relative">
              <button
                onClick={closeCarousel}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prev}
                  disabled={currentIdx === 0}
                  className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <span className="font-semibold">
                  {new Date(
                    modalComics[currentIdx].comic_date
                  ).toLocaleDateString("pt-BR")}
                </span>
                <button
                  onClick={next}
                  disabled={currentIdx === modalComics.length - 1}
                  className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <img
                src={modalComics[currentIdx].image_url}
                alt="tirinha"
                className="w-full h-64 object-contain mb-2 rounded-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/placeholder-comic.png";
                }}
              />
              <p className="text-sm text-gray-600 text-center">
                Questões respondidas nesse dia: {counts[currentIdx] ?? 0}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}