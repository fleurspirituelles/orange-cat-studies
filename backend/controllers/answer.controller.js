import Answer from "../models/answer.model.js";
import Comic from "../models/comic.model.js";
import connection from "../config/database.js";

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
      const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      const exists = await Comic.existsForDate(id_user, today);
      if (!exists) {
        const [yy, mm, dd] = today.split("-");
        const shortYear = yy.slice(-2);
        const imageUrl = `https://picayune.uclick.com/comics/ga/${yy}/ga${shortYear}${mm}${dd}.gif`;
        await Comic.create({ id_user, comic_date: today, image_url: imageUrl });
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