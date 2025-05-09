const User = require("../models/user.model");

async function getAll(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: "Failed to fetch users." });
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch {
    res.status(500).json({ error: "Failed to create user." });
  }
}

async function getById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ error: "User not found." });
  } catch {
    res.status(500).json({ error: "Failed to fetch user." });
  }
}

async function update(req, res) {
  try {
    const [updated] = await User.update(req.body, {
      where: { user_id: req.params.id },
    });
    if (updated) res.status(200).json({ message: "User updated." });
    else res.status(404).json({ error: "User not found." });
  } catch {
    res.status(500).json({ error: "Failed to update user." });
  }
}

async function remove(req, res) {
  try {
    const deleted = await User.destroy({
      where: { user_id: req.params.id },
    });
    if (deleted) res.status(200).json({ message: "User deleted." });
    else res.status(404).json({ error: "User not found." });
  } catch {
    res.status(500).json({ error: "Failed to delete user." });
  }
}

module.exports = { getAll, create, getById, update, remove };