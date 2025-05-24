import db from "../config/database.js";

export const create = async (req, res) => {
  const { id_user, exam_name, board, level, year, position } = req.body;

  if (!id_user || !exam_name || !board || !level || !year || !position) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO exams (id_user, exam_name, board, level, year, position) VALUES (?, ?, ?, ?, ?, ?)",
      [id_user, exam_name, board, level, year, position]
    );

    res.status(201).json({ id_exam: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error creating exam.", error });
  }
};

export const getAll = async (_req, res) => {
  try {
    const [exams] = await db.query("SELECT * FROM exams");
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving exams.", error });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM exams WHERE id_exam = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Exam not found." });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving exam.", error });
  }
};