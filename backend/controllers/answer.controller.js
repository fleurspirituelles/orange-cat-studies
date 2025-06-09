import Answer from "../models/answer.model.js";
import Comic from "../models/comic.model.js";
import connection from "../config/database.js";

function randomComicDate() {
  const start = new Date(1980, 0, 1).getTime();
  const end = new Date(2024, 11, 31).getTime();
  const ts = start + Math.random() * (end - start);
  const d = new Date(ts);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return { year, month, day };
}

export async function getAll(req, res) {
  try {
    const answers = await Answer.getAll();
    res.status(200).json(answers);
  } catch {
    res.status(500).json({ error: "Failed to retrieve answers." });
  }
}

export async function getById(req, res) {
  try {
    const answer = await Answer.getById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found." });
    res.status(200).json(answer);
  } catch {
    res.status(500).json({ error: "Failed to retrieve answer." });
  }
}

export async function create(req, res) {
  const { id_user, id_question, selected_choice } = req.body;
  if (!id_user || !id_question || !selected_choice) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newAnswer = await Answer.create({
      id_user,
      id_question,
      selected_choice,
    });

    const [countRows] = await connection.execute(
      "SELECT COUNT(*) AS cnt FROM answers WHERE id_user = ? AND DATE(answer_date) = CURDATE()",
      [id_user]
    );
    const todayCount = countRows[0].cnt;

    if (todayCount >= 10) {
      const todayIso = new Date().toISOString().slice(0, 10);
      const already = await Comic.existsForDate(id_user, todayIso);
      if (!already) {
        const { year, month, day } = randomComicDate();
        const yy = String(year).slice(-2);
        const filename = `ga${yy}${month}${day}.gif`;
        const imageUrl = `https://picayune.uclick.com/comics/ga/${year}/${filename}`;
        await Comic.create({
          id_user,
          comic_date: todayIso,
          image_url: imageUrl,
        });
      }
    }

    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ message: "Error creating answer.", error });
  }
}

export async function update(req, res) {
  try {
    const updated = await Answer.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Answer not found." });
    res.status(200).json({ message: "Answer updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update answer." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Answer.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Answer not found." });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete answer." });
  }
}