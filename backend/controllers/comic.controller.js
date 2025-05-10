const Comic = require("../models/comic.model");

async function getAll(req, res) {
  const comics = await Comic.find();
  res.status(200).json(comics);
}

async function getById(req, res) {
  const comic = await Comic.findById(req.params.id);
  if (!comic) return res.status(404).end();
  res.status(200).json(comic);
}

async function getByCode(req, res) {
  const comic = await Comic.findOne({ code: req.params.code });
  if (!comic) return res.status(404).end();
  res.status(200).json(comic);
}

async function getByUser(req, res) {
  const comics = await Comic.find({ id_user: req.params.id_user });
  res.status(200).json(comics);
}

async function getByAlbum(req, res) {
  const comics = await Comic.find({ id_album: req.params.id_album });
  res.status(200).json(comics);
}

async function create(req, res) {
  const comic = await Comic.create(req.body);
  res.status(201).json(comic);
}

async function update(req, res) {
  const comic = await Comic.findById(req.params.id);
  if (!comic) return res.status(404).end();
  await comic.updateOne(req.body);
  res.status(200).json(await Comic.findById(req.params.id));
}

async function remove(req, res) {
  const comic = await Comic.findById(req.params.id);
  if (!comic) return res.status(404).end();
  await comic.deleteOne();
  res.status(204).end();
}

module.exports = {
  getAll,
  getById,
  getByCode,
  getByUser,
  getByAlbum,
  create,
  update,
  remove,
};