import Performance from "../models/performance.model.js";
import User from "../models/user.model.js";

async function getIdUserByFirebase(req) {
  const uid = req.user.uid;
  const user = await User.getByUID(uid);
  return user?.id_user;
}

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
  const id_user = await getIdUserByFirebase(req);
  if (!id_user) return res.status(401).json({ message: "Unauthorized." });

  const recs = await Performance.getByUser(id_user);
  res.status(200).json(recs);
}

export async function getByPeriod(req, res) {
  const id_user = await getIdUserByFirebase(req);
  if (!id_user) return res.status(401).json({ message: "Unauthorized." });

  const { start, end } = req.params;
  const rec = await Performance.getByPeriod(id_user, start, end);

  if (rec) {
    res.status(200).json(rec);
    return;
  }

  const dynamic = await Performance.getFromComics(id_user, start, end);
  res.status(200).json(dynamic);
}

export async function create(req, res) {
  const id_user = await getIdUserByFirebase(req);
  if (!id_user) return res.status(401).json({ message: "Unauthorized." });

  const data = { ...req.body, id_user };
  const rec = await Performance.create(data);
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