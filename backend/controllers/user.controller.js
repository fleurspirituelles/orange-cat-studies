import User from "../models/user.model.js";

export async function getAll(_req, res) {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
}

export async function getById(req, res) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
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

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error handling user email", error });
  }
}