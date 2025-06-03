import UserModel from "../models/user.model.js";

const UserController = {
  getAll: async (req, res) => {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  },

  create: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await UserModel.create({ name, email, password });
    res.status(201).json(user);
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;

    const updated = await UserModel.update(id, { name, email, password });
    if (!updated) return res.sendStatus(404);
    res.status(200).json(updated);
  },

  remove: async (req, res) => {
    const id = req.params.id;
    const deleted = await UserModel.remove(id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "User deleted" });
  },
};

export default UserController;