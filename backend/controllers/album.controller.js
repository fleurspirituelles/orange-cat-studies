import Album from "../models/album.model.js";

export async function getAll(req, res) {
  try {
    const albums = await Album.getAll();
    res.status(200).json(albums);
  } catch {
    res.status(500).json({ error: "Failed to retrieve albums." });
  }
}

export async function getById(req, res) {
  try {
    const album = await Album.getById(req.params.id);
    if (!album) return res.status(404).json({ error: "Album not found." });
    res.status(200).json(album);
  } catch {
    res.status(500).json({ error: "Failed to retrieve album." });
  }
}

export async function create(req, res) {
  try {
    const newAlbum = await Album.create(req.body);
    res.status(201).json(newAlbum);
  } catch {
    res.status(400).json({ error: "Failed to create album." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Album.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Album not found." });
    res.status(200).json({ message: "Album updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update album." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Album.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Album not found." });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete album." });
  }
}