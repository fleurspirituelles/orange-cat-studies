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
    loadComics();
  }, []);

  function loadComics() {
    api.get<Comic[]>(`/comics`).then((res) => {
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

        api
          .get<Album>(`/albums/month/${month}/${year}`)
          .then((r) => {
            const totalDays = r.data.total_days;
            api
              .get<Performance>(`/performance/period/${startDate}/${endDate}`)
              .then((perf) => {
                setStats((old) => ({
                  ...old,
                  [ym]: {
                    unlocked: list.length,
                    totalDays,
                    correct: perf.data.correct_count,
                    possible: perf.data.question_count,
                  },
                }));
              })
              .catch(() => {
                setStats((old) => ({
                  ...old,
                  [ym]: {
                    unlocked: list.length,
                    totalDays,
                    correct: 0,
                    possible: totalDays * 10,
                  },
                }));
              });
          })
          .catch(() => {
            const totalDaysFallback = daysInMonth;
            api
              .get<Performance>(`/performance/period/${startDate}/${endDate}`)
              .then((perf) => {
                setStats((old) => ({
                  ...old,
                  [ym]: {
                    unlocked: list.length,
                    totalDays: totalDaysFallback,
                    correct: perf.data.correct_count,
                    possible: perf.data.question_count,
                  },
                }));
              })
              .catch(() => {
                setStats((old) => ({
                  ...old,
                  [ym]: {
                    unlocked: list.length,
                    totalDays: totalDaysFallback,
                    correct: 0,
                    possible: totalDaysFallback * 10,
                  },
                }));
              });
          });
      });
    });
  }

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

  function getMonthName(month: string) {
    const date = new Date(2024, parseInt(month) - 1, 1);
    return date
      .toLocaleString("pt-BR", { month: "long" })
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-neutral-100 py-8 px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
              Álbum de Tirinhas
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed text-center md:text-left">
              Acompanhe seu progresso desbloqueando tirinhas conforme completa
              os desafios diários. Visualize os meses, veja suas conquistas e
              mantenha sua coleção sempre atualizada.
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(groups).map(([ym, list]) => {
              const [year, month] = ym.split("-");
              const s = stats[ym] || {
                unlocked: list.length,
                totalDays: 0,
                correct: 0,
                possible: 0,
              };
              const monthName = getMonthName(month);
              const today = new Date();
              const isCurrentMonth =
                today.getFullYear() === +year &&
                today.getMonth() + 1 === +month;
              const todayDay = today.getDate();
              const todayStr = today.toISOString().slice(0, 10);
              const hasComicToday = list.some((c) => c.comic_date === todayStr);
              const remainingDays = isCurrentMonth
                ? Math.max(0, s.totalDays - todayDay + (hasComicToday ? 0 : 1))
                : 0;

              return (
                <div key={ym} className="bg-white rounded-xl shadow p-6 border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-base font-semibold mb-1">
                        {monthName} / {year}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Visualize suas tirinhas desbloqueadas neste mês.
                      </p>
                    </div>
                    <button
                      onClick={() => openCarousel(list)}
                      className="px-4 py-2 bg-orange-500 text-white rounded text-sm"
                    >
                      Ver Tirinhas
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Array.from({ length: 3 }).map((_, idx) => {
                      const c = list[list.length - 1 - idx];
                      if (c) {
                        return (
                          <img
                            key={c.id_comic}
                            src={c.image_url}
                            alt="tirinha"
                            className="w-full h-48 object-cover rounded-lg border"
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
                            className="w-full h-48 bg-gray-100 rounded-lg border"
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
                      <p className="text-2xl font-bold">{remainingDays}</p>
                      <p className="text-sm text-gray-600">
                        Tirinhas restantes no mês
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
            <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 md:mx-0 p-6 relative">
              <button
                onClick={closeCarousel}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prev}
                  disabled={currentIdx === 0}
                  className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(
                      modalComics[currentIdx].comic_date
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <button
                  onClick={next}
                  disabled={currentIdx === modalComics.length - 1}
                  className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <div className="w-full flex justify-center mb-4">
                <div className="w-full md:w-3/4 aspect-[3/2] bg-neutral-100 rounded-lg border overflow-hidden flex items-center justify-center">
                  <img
                    src={modalComics[currentIdx].image_url}
                    alt="tirinha"
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/placeholder-comic.png";
                    }}
                  />
                </div>
              </div>

              <p className="text-base text-gray-700 text-center">
                Questões respondidas nesse dia:{" "}
                <span className="font-semibold">
                  {modalComics[currentIdx].answered_count}
                </span>
                .
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}