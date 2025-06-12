import Album from "../models/album.model.js";

export async function getAll(req, res) {
  const albums = await Album.getAll();
  res.status(200).json(albums);
}

export async function getById(req, res) {
  const alb = await Album.getById(req.params.id);
  if (!alb) return res.status(404).json({ error: "Album not found." });
  res.status(200).json(alb);
}

export async function getByUser(req, res) {
  const list = await Album.getByUser(req.params.id_user);
  res.status(200).json(list);
}

export async function getByMonth(req, res) {
  const { id_user, month, year } = req.params;
  const alb = await Album.getByMonth(id_user, +month, +year);
  if (!alb) return res.status(404).json({ error: "Album not found." });
  res.status(200).json(alb);
}

export async function create(req, res) {
  const alb = await Album.create(req.body);
  res.status(201).json(alb);
}

export async function update(req, res) {
  const ok = await Album.update(req.params.id, req.body);
  if (!ok) return res.status(404).json({ error: "Album not found." });
  res.status(200).json({ message: "Album updated." });
}

export async function remove(req, res) {
  const ok = await Album.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Album not found." });
  res.status(204).end();
}