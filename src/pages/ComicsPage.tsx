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
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comics.map((comic) => {
            const date = new Date(comic.comic_date).toLocaleDateString("pt-BR");
            return (
              <div key={comic.id_comic} className="space-y-2">
                <img
                  src={comic.image_url}
                  alt={`Tirinha de ${date}`}
                  className="w-full rounded-lg shadow"
                />
                <p className="text-sm text-gray-600 text-center">{date}</p>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}