const Question = require("../models/question.model");

async function create(req, res) {
    const data = req.body;
    const question = await Question.create(data);
    res.status(201).json(question);
}

async function getAll(req, res) {
    const questions = await Question.findAll();
    res.status(200).json(questions);
}

async function getById(req, res) {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).end();
    res.status(200).json(question);
}

async function update(req, res) {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).end();
    await question.update(req.body);
    res.status(200).json(question);
}

async function remove(req, res) {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).end();
    await question.destroy();
    res.status(204).end();
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};
