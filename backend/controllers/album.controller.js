const Album = require("../models/album.model");

async function getAll(req, res) {
  const albums = await Album.findAll();
  res.status(200).json(albums);
}

async function getById(req, res) {
  const album = await Album.findByPk(req.params.id);
  if (!album) return res.status(404).end();
  res.status(200).json(album);
}

async function create(req, res) {
  const album = await Album.create(req.body);
  res.status(201).json(album);
}

async function update(req, res) {
  const album = await Album.findByPk(req.params.id);
  if (!album) return res.status(404).end();
  await album.update(req.body);
  res.status(200).json(album);
}

async function remove(req, res) {
  const album = await Album.findByPk(req.params.id);
  if (!album) return res.status(404).end();
  await album.destroy();
  res.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };