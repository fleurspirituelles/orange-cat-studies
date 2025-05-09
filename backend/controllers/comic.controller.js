const Comic = require("../models/comic.model");

async function getAll(req, res) {
  try {
    const comics = await Comic.find();
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comics." });
  }
}

async function create(req, res) {
  try {
    const newComic = await Comic.create(req.body);
    res.status(201).json(newComic);
  } catch (error) {
    res.status(500).json({ error: "Error creating comic." });
  }
}

async function getById(req, res) {
  try {
    const comic = await Comic.findById(req.params.id);
    if (comic) {
      res.status(200).json(comic);
    } else {
      res.status(404).json({ error: "Comic not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching comic." });
  }
}

async function update(req, res) {
  try {
    const updatedComic = await Comic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedComic) {
      res.status(200).json(updatedComic);
    } else {
      res.status(404).json({ error: "Comic not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating comic." });
  }
}

async function remove(req, res) {
  try {
    const deletedComic = await Comic.findByIdAndDelete(req.params.id);
    if (deletedComic) {
      res.status(200).json({ message: "Comic successfully deleted." });
    } else {
      res.status(404).json({ error: "Comic not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting comic." });
  }
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};