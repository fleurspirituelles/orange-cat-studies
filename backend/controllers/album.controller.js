const Album = require("../models/album.model");

async function getAll(req, res) {
  try {
    const albums = await Album.findAll();
    res.status(200).json(albums);
  } catch {
    res.status(500).json({ error: "Failed to retrieve albums." });
  }
}

async function getById(req, res) {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).json({ error: "Album not found." });
    res.status(200).json(album);
  } catch {
    res.status(500).json({ error: "Failed to retrieve album." });
  }
}

async function create(req, res) {
  try {
    const album = await Album.create(req.body);
    res.status(201).json(album);
  } catch {
    res.status(400).json({ error: "Failed to create album." });
  }
}

async function update(req, res) {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).json({ error: "Album not found." });
    await album.update(req.body);
    res.status(200).json(album);
  } catch {
    res.status(400).json({ error: "Failed to update album." });
  }
}

async function remove(req, res) {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).json({ error: "Album not found." });
    await album.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete album." });
  }
}

module.exports = { getAll, getById, create, update, remove };