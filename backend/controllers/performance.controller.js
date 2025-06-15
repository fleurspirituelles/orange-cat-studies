import Performance from "../models/performance.model.js";

export async function getAll(req, res) {
  const records = await Performance.getAll();
  res.status(200).json(records);
}

export async function getById(req, res) {
  const rec = await Performance.getById(req.params.id);
  if (!rec) return res.status(404).json({ error: "Performance not found." });
  res.status(200).json(rec);
}

export async function getByUser(req, res) {
  const recs = await Performance.getByUser(req.params.id_user);
  res.status(200).json(recs);
}

export async function getByPeriod(req, res) {
  const { id_user, start, end } = req.params;
  const rec = await Performance.getByPeriod(id_user, start, end);
  if (!rec) {
    return res.status(200).json({
      question_count: 0,
      correct_count: 0,
    });
  }
  res.status(200).json(rec);
}

export async function create(req, res) {
  const rec = await Performance.create(req.body);
  res.status(201).json(rec);
}

export async function update(req, res) {
  const ok = await Performance.update(req.params.id, req.body);
  if (!ok) return res.status(404).json({ error: "Performance not found." });
  res.status(200).json({ message: "Performance updated." });
}

export async function remove(req, res) {
  const ok = await Performance.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Performance not found." });
  res.status(204).end();
}