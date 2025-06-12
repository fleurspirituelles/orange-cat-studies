import Comic from "../models/comic.model.js";
import axios from "axios";

export async function getAll(_req, res) {
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
  const { id_user, comic_date } = req.params;
  const comic = await Comic.getByDate(id_user, comic_date);
  if (!comic)
    return res
      .status(404)
      .json({ message: "Comic not found for this user/date." });
  res.status(200).json(comic);
}

export async function create(req, res) {
  const { id_user, comic_date, image_url } = req.body;
  const created = await Comic.create({
    id_user,
    comic_date,
    image_url,
    answered_count: 0,
  });
  res.status(201).json(created);
}

export async function fetchImage(req, res) {
  const { comic_date } = req.params;
  const [year, month, day] = comic_date.split("-");
  const yy = year.slice(-2);
  const filename = `ga${yy}${month}${day}.gif`;
  const remoteUrl = `http://pt.jikos.cz/garfield/${year}/${filename}`;
  try {
    const response = await axios.get(remoteUrl, { responseType: "stream" });
    res.setHeader("Content-Type", "image/gif");
    response.data.pipe(res);
  } catch {
    res.sendStatus(404);
  }
}

export async function remove(req, res) {
  const success = await Comic.remove(req.params.id);
  if (!success) return res.status(404).json({ message: "Comic not found." });
  res.status(200).json({ message: "Comic deleted successfully." });
}