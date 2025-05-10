const Comic = require("../models/comic.model");

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

async function getAll(req, res) {
  const comics = await Comic.find();
  res.status(200).json(comics);
}

async function getById(req, res) {
  const comic = await Comic.findById(req.params.id);
  if (!comic) return res.status(404).json({ message: "Comic not found." });
  res.status(200).json(comic);
}

async function create(req, res) {
  const { url, id_user, id_album } = req.body;
  const code = extractCodeFromUrl(url);
  const date = extractDateFromUrl(url);

  if (!code || !date)
    return res.status(400).json({ message: "Invalid comic URL." });

  const existing = await Comic.findOne({ code, id_user });
  if (existing)
    return res
      .status(409)
      .json({ message: "Comic already claimed by this user." });

  const newComic = new Comic({
    code,
    url,
    day: date.day,
    month: date.month,
    year: date.year,
    id_user,
    id_album,
  });

  await newComic.save();
  res.status(201).json(newComic);
}

async function remove(req, res) {
  const deleted = await Comic.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Comic not found." });
  res.status(200).json({ message: "Comic deleted successfully." });
}

module.exports = { getAll, getById, create, remove };