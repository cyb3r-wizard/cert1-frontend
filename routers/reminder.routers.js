import { Router } from "express";
import { reminders } from "../index.js";
import crypto from "node:crypto";
const reminderRouter = Router();

reminderRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "AUTORIZADO: AQUI SE MOSTRARÁN LAS TAREAS",
    reminders: reminders,
  });
});

reminderRouter.post("/", (req, res) => {
  const { content, important } = req.body;
  const reminder = {
    id: crypto.randomUUID(),
    content: content,
    createdAt: Date.now(),
    important: important,
  };
  reminders.push(reminder);
  res.status(200).json({ reminders: reminders });
});

reminderRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Has ingresado el id: ${id} ` });
});

reminderRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Has borrado el id ${id}` });
});

export default reminderRouter;
