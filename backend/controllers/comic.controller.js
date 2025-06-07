import Comic from "../models/comic.model.js";

export const getAll = async (req, res) => {
  try {
    const comics = await Comic.getAll();
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comics" });
  }
};

export const getById = async (req, res) => {
  try {
    const comic = await Comic.getById(req.params.id);
    if (!comic) return res.status(404).json({ message: "Comic not found" });
    res.status(200).json(comic);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comic" });
  }
};

export const getByUser = async (req, res) => {
  try {
    const comics = await Comic.getByUser(req.params.id_user);
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user's comics" });
  }
};

export const create = async (req, res) => {
  try {
    const { id_user, comic_date, image_url } = req.body;
    const newComic = await Comic.create({ id_user, comic_date, image_url });
    res.status(201).json(newComic);
  } catch (error) {
    res.status(500).json({ message: "Error creating comic" });
  }
};

export const remove = async (req, res) => {
  try {
    const success = await Comic.remove(req.params.id);
    if (!success) return res.status(404).json({ message: "Comic not found" });
    res.status(200).json({ message: "Comic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comic" });
  }
};