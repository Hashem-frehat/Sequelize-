const express = require("express");
const router = express.Router();
const { Task } = require("../models");
const authenticateToken = require("../middleware/auth");

router.post("/", authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, userid: req.user.id });
  res.status(201).json(task);
});

router.get("/", authenticateToken, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const [updated] = await Task.update(
    { title, description },
    { where: { id: req.params.id, userId: req.user.id } }
  );
  if (updated) {
    const updatedTask = await Task.findOne({ where: { id: req.params.id } });
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const deleted = await Task.destroy({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});
module.exports = router;
