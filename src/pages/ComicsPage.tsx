import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ComicsPage() {
  const [dates] = useState<string[]>([
    "1980-09-01",
    "1980-09-02",
    "1980-09-03",
    "1980-09-04",
  ]);
  const comics = dates.map((date) => {
    const [year, month, day] = date.split("-");
    const yy = year.slice(-2);
    return `https://picayune.uclick.com/comics/ga/${year}/ga${yy}${month}${day}.gif`;
  });

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f8f8] min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comics.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Comic ${dates[i]}`}
              className="w-full rounded-lg shadow"
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}