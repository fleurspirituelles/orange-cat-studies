import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Comic {
  id_comic: number;
  id_user: string;
  comic_date: string;
  image_url: string;
  answered_count: number;
}

interface Album {
  total_days: number;
}

interface Performance {
  question_count: number;
  correct_count: number;
}

interface Stats {
  unlocked: number;
  totalDays: number;
  correct: number;
  possible: number;
}

export default function ComicsPage() {
  const [groups, setGroups] = useState<Record<string, Comic[]>>({});
  const [stats, setStats] = useState<Record<string, Stats>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalComics, setModalComics] = useState<Comic[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    api
      .get<Comic[]>(`/comics`)
      .then((res) => {
        const g: Record<string, Comic[]> = {};
        res.data.forEach((c) => {
          const ym = c.comic_date.slice(0, 7);
          (g[ym] ||= []).push(c);
        });
        setGroups(g);

        Object.entries(g).forEach(([ym, list]) => {
          const [year, month] = ym.split("-");
          const daysInMonth = new Date(+year, +month, 0).getDate();
          const startDate = `${year}-${month}-01`;
          const endDate = `${year}-${month}-${String(daysInMonth).padStart(
            2,
            "0"
          )}`;

          api.get<Album>(`/albums/month/${month}/${year}`).then((r) => {
            const totalDays = r.data.total_days;
            const possible = totalDays * 10;
            setStats((old) => ({
              ...old,
              [ym]: {
                unlocked: list.length,
                totalDays,
                correct: 0,
                possible,
              },
            }));
          });

          api
            .get<Performance>(`/performance/period/${startDate}/${endDate}`)
            .then((r) => {
              setStats((old) => ({
                ...old,
                [ym]: {
                  unlocked: old[ym]?.unlocked ?? list.length,
                  totalDays: old[ym]?.totalDays ?? daysInMonth,
                  correct: r.data.correct_count,
                  possible: old[ym]?.possible ?? daysInMonth * 10,
                },
              }));
            });
        });
      })
      .catch(console.error);
  }, []);

  function openCarousel(list: Comic[]) {
    setModalComics(list);
    setCurrentIdx(0);
    setModalOpen(true);
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
      <main className="bg-gray-100 min-h-screen py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <h2 className="text-4xl font-bold text-gray-900 text-center md:text-left">
              Álbuns de Tirinhas
            </h2>
            <p className="text-neutral-700 text-sm leading-relaxed text-center md:text-left">
              Colecione tirinhas do Garfield como recompensas diárias ao
              concluir seus desafios. Acompanhe seu progresso mês a mês,
              desbloqueie novas tirinhas e complete seu álbum digital.
            </p>
          </div>

          <div className="space-y-10">
            {Object.entries(groups).map(([ym, list]) => {
              const [year, month] = ym.split("-");
              const daysInMonth = new Date(+year, +month, 0).getDate();
              const start = `01/${month}`;
              const end = `${daysInMonth}/${month}`;
              const s = stats[ym] || {
                unlocked: 0,
                totalDays: daysInMonth,
                correct: 0,
                possible: daysInMonth * 10,
              };

              return (
                <div
                  key={ym}
                  className="bg-white rounded-2xl shadow p-6 border"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {start} – {end}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Veja as tirinhas que você desbloqueou no mês.
                      </p>
                    </div>
                    <button
                      onClick={() => openCarousel(list)}
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Ver tirinhas
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Array.from({ length: 3 }).map((_, idx) => {
                      const c = list[list.length - 1 - idx];
                      if (c) {
                        return (
                          <img
                            key={c.id_comic}
                            src={c.image_url}
                            alt="tirinha"
                            className="w-full h-48 object-cover rounded-xl border"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "/images/placeholder-comic.png";
                            }}
                          />
                        );
                      } else {
                        return (
                          <div
                            key={idx}
                            className="w-full h-48 bg-gray-100 rounded-xl border"
                          />
                        );
                      }
                    })}
                  </div>

                  <div className="grid grid-cols-3 text-center pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold">
                        {s.unlocked} / {s.totalDays}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tirinhas desbloqueadas
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {s.totalDays} / {s.totalDays}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total de tirinhas no mês
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {s.correct} / {s.possible}
                      </p>
                      <p className="text-sm text-gray-600">Questões corretas</p>
                    </div>
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
                Questões respondidas nesse dia:{" "}
                {modalComics[currentIdx].answered_count}.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}