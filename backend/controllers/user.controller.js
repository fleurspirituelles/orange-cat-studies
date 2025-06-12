import User from "../models/user.model.js";

export async function getAll(_req, res) {
  try {
    const users = await User.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users", error });
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

export async function getByEmail(req, res) {
  const email = req.params.email;
  try {
    const existing = await User.getByEmail(email);
    if (existing) {
      return res.status(200).json(existing);
    }
    const name = email.split("@")[0];
    const newUser = await User.create({ name, email, password: null });
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error handling user email", error });
  }
}

export async function create(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newUser = await User.create({ name, email, password });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updated = await User.update(id, { name, email, password });
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user", error });
  }
}

export async function remove(req, res) {
  const { id } = req.params;
  try {
    const deleted = await User.remove(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user", error });
  }
}