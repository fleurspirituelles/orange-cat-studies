import Comic from "../models/comic.model.js";

function extractCodeFromUrl(url) {
  const match = url.match(/ga(\d{2})(\d{2})(\d{2})/);
  if (!match) return null;
  return `ga${match[1]}${match[2]}${match[3]}`;
}

function extractDateFromUrl(url) {
  const match = url.match(/ga(\d{2})(\d{2})(\d{2})/);
  if (!match) return null;
  const yearPrefix = parseInt(match[1], 10) < 70 ? "20" : "19";
  const year = parseInt(`${yearPrefix}${match[1]}`, 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  return { year, month, day };
}

export async function getAll(req, res) {
  const comics = await Comic.getAll();
  res.status(200).json(comics);
}

export async function getById(req, res) {
  const comic = await Comic.getById(req.params.id);
  if (!comic) return res.status(404).json({ message: "Comic not found." });
  res.status(200).json(comic);
}

export async function getByUser(req, res) {
  const comics = await Comic.getByUser(req.params.id_user);
  res.status(200).json(comics);
}

export async function getByDate(req, res) {
  const comic = await Comic.getByDate(req.params.comic_date);
  if (!comic)
    return res.status(404).json({ message: "Comic not found for this date." });
  res.status(200).json(comic);
}

export async function create(req, res) {
  const { url, id_user } = req.body;
  const code = extractCodeFromUrl(url);
  const date = extractDateFromUrl(url);
  if (!code || !date) {
    return res.status(400).json({ message: "Invalid comic URL." });
  }
  const all = await Comic.getByUser(id_user);
  if (all.find((c) => c.code === code)) {
    return res
      .status(409)
      .json({ message: "Comic already claimed by this user." });
  }
  const newComic = {
    id_user,
    comic_date: `${date.year}-${String(date.month).padStart(2, "0")}-${String(
      date.day
    ).padStart(2, "0")}`,
    image_url: url,
  };
  const created = await Comic.create(newComic);
  res.status(201).json(created);
}

export async function remove(req, res) {
  const success = await Comic.remove(req.params.id);
  if (!success) return res.status(404).json({ message: "Comic not found." });
  res.status(200).json({ message: "Comic deleted successfully." });
}