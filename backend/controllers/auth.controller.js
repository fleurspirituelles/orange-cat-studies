import User from "../models/user.model.js";

export async function create(req, res) {
  const { id_user, name, email } = req.body;
  if (!id_user || !name || !email) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const existing = await User.getById(id_user);
    if (existing) {
      return res.status(409).json({ message: "User already exists." });
    }
    const newUser = await User.create({ id_user, name, email, password: null });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
}

export async function getById(req, res) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user", error });
  }
}

export async function getAll(_req, res) {
  try {
    const users = await User.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users", error });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await User.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user", error });
  }
}