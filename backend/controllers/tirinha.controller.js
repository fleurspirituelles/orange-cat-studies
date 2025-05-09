const Tirinha = require("../models/tirinha.model");

exports.criarTirinha = async (req, res) => {
  try {
    const nova = new Tirinha(req.body);
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error saving comic:", details: err.message });
  }
};

exports.listarTirinhas = async (req, res) => {
  try {
    const lista = await Tirinha.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: "Error fetching comic:" });
  }
};