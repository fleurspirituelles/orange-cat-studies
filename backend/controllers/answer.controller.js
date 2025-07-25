import Answer from "../models/answer.model.js";
import Comic from "../models/comic.model.js";
import Performance from "../models/performance.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";
import connection from "../config/database.js";

function randomComicDate() {
  const start = new Date(1980, 0, 1).getTime();
  const end = new Date(2024, 11, 31).getTime();
  const d = new Date(start + Math.random() * (end - start));
  return {
    year: d.getFullYear(),
    month: String(d.getMonth() + 1).padStart(2, "0"),
    day: String(d.getDate()).padStart(2, "0"),
  };
}

function todayIsoLocal() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}`;
}

async function getIdUserByFirebase(req) {
  const uid = req.user.uid;
  const user = await User.getByUID(uid);
  return user?.id_user;
}

export async function getAll(_req, res) {
  try {
    const answers = await Answer.getAll();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching answers.", error });
  }
}

export async function getById(req, res) {
  try {
    const answer = await Answer.getById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found." });
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching answer.", error });
  }
}

export async function create(req, res) {
  const id_user = await getIdUserByFirebase(req);
  if (!id_user) return res.status(401).json({ message: "Unauthorized." });

  const { id_question, selected_choice } = req.body;
  if (!id_question || !selected_choice) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newAnswer = await Answer.create({
      id_user,
      id_question,
      selected_choice,
    });

    const today = todayIsoLocal();
    const [yyyy, MM] = today.split("-");
    const startDate = `${yyyy}-${MM}-01`;
    const endDate = `${yyyy}-${MM}-${new Date(yyyy, +MM, 0).getDate()}`;

    const [[{ cnt: todayCount }]] = await connection.execute(
      "SELECT COUNT(*) AS cnt FROM answers WHERE id_user = ? AND DATE(answer_date) = CURDATE()",
      [id_user]
    );

    if (todayCount >= 10 && !(await Comic.existsForDate(id_user, today))) {
      const { year, month, day } = randomComicDate();
      const yy = String(year).slice(-2);
      const filename = `ga${yy}${month}${day}.gif`;
      const imageUrl = `https://picayune.uclick.com/comics/ga/${year}/${filename}`;
      await Comic.create({
        id_user,
        comic_date: today,
        image_url: imageUrl,
        answered_count: todayCount,
      });
    } else if (todayCount >= 10) {
      await Comic.updateAnsweredCount(id_user, today, todayCount);
    }

    const [[{ cnt: correctFromAnswers }]] = await connection.execute(
      `SELECT COUNT(*) AS cnt
       FROM answers a
       JOIN questions q ON a.id_question = q.id_question
       WHERE a.id_user = ?
         AND DATE(a.answer_date) BETWEEN ? AND ?
         AND a.selected_choice = q.answer_key`,
      [id_user, startDate, endDate]
    );

    const [[{ cnt: totalAnsweredFromComics }]] = await connection.execute(
      "SELECT COALESCE(SUM(answered_count), 0) AS cnt FROM comics WHERE id_user = ? AND comic_date BETWEEN ? AND ?",
      [id_user, startDate, endDate]
    );

    let perf = await Performance.getByPeriod(id_user, startDate, endDate);
    if (perf) {
      await Performance.update(perf.id_performance, {
        question_count: totalAnsweredFromComics,
        correct_count: correctFromAnswers,
      });
    } else {
      await Performance.create({
        id_user,
        start_date: startDate,
        end_date: endDate,
        question_count: totalAnsweredFromComics,
        correct_count: correctFromAnswers,
      });
    }

    const monthNum = +MM;
    const yearNum = +yyyy;
    if (!(await Album.getByMonth(id_user, monthNum, yearNum))) {
      const totalDays = new Date(yyyy, monthNum, 0).getDate();
      await Album.create({
        id_user,
        month: monthNum,
        year: yearNum,
        total_days: totalDays,
      });
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
  } catch (error) {
    res.status(400).json({ error: "Failed to update answer." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Answer.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Answer not found." });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete answer." });
  }
}

export async function countByUserDate(req, res) {
  const id_user = await getIdUserByFirebase(req);
  if (!id_user) return res.status(401).json({ message: "Unauthorized." });

  const { date } = req.params;
  try {
    const [[{ cnt }]] = await connection.execute(
      "SELECT COUNT(*) AS cnt FROM answers WHERE id_user = ? AND DATE(answer_date) = ?",
      [id_user, date]
    );
    res.status(200).json({ count: cnt });
  } catch (error) {
    res.status(500).json({ error: "Failed to count answers." });
  }
}