import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

interface Comic {
  id_comic: number;
  id_user: number;
  comic_date: string;
  image_url: string;
}

export default function ComicsPage() {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;
    const user = JSON.parse(stored);
    axios
      .get<Comic[]>(`http://localhost:5000/comics/user/${user.id_user}`)
      .then((res) => setComics(res.data))
      .catch(console.error);
  }, []);

  const groups = comics.reduce<Record<string, Comic[]>>((acc, c) => {
    const ym = c.comic_date.slice(0, 7);
    (acc[ym] ||= []).push(c);
    return acc;
  }, {});

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
              const monthIndex = +month - 1;
              const monthName = monthNames[monthIndex] || month;

              return (
                <div key={ym} className="bg-white border rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{`${start} – ${end}`}</h2>
                      <p className="text-sm text-gray-600">
                        Veja as tirinhas que você desbloqueou em {monthName}.
                        Continue firme e volte todos os dias para completar o
                        álbum!
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded">
                      Ver tirinhas
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {list.slice(-2).map((comic) => {
                      const date = new Date(
                        comic.comic_date
                      ).toLocaleDateString("pt-BR");
                      return (
                        <img
                          key={comic.id_comic}
                          src={comic.image_url}
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
      </main>
      <Footer />
    </>
  );
}
