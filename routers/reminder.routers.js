import { Router } from "express";
import { reminders } from "../index.js";
import crypto from "node:crypto";
const reminderRouter = Router();

reminderRouter.get("/", (req, res) => {
  res.status(200).send(reminders);
});

reminderRouter.post("/", (req, res) => {
  try {
    const { content, important } = req.body;

    // typeof important !== undefined ? (important = true) : (important = false);
    if (typeof content !== "string") {
      return res.status(400).json({ message: "El mensaje debe ser un string" });
    }
    if (content.length > 120) {
      return res.status(400).json({
        message: "El mensaje es demasiado largo (max. 120 caracteres)",
      });
    }

    if (typeof important !== "boolean") {
      return res.status(400).json({
        message: "Esto no es un booleano!",
      });
    }
    const reminder = {
      id: crypto.randomUUID(),
      content: content,
      createdAt: Date.now(),
      important: important,
    };
    reminders.push(reminder);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(400).json({ error: `ERROR: ${error}` });
  }
});

reminderRouter.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const reminder = reminders.find((reminder) => reminder.id === id);
    if (!reminder) {
      return res.status(404);
    }
    const { important, content } = req.body;

    if (typeof content !== "string") {
      return res.status(400).json(reminder);
    }
    if (content.length > 120) {
      return res.status(400).json(reminder);
    }

    if (typeof important === "boolean") {
      reminder.important = important;
    }

    reminder.content = content;

    return res.status(200).json(reminder);
  } catch (error) {
    return res.status(400).json({ error: `reminder router error: ${error}` });
  }
});

reminderRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.json({ message: `Has borrado el id ${id}` });
    let index = reminders.pop(reminders.find((reminder) => reminder.id));
    if (!index) {
      return res.status(404);
    }
    res.status(204);
  } catch (error) {
    res.status(400).json({ error: `ERROR ${error}` });
  }
});

export default reminderRouter;

/* 
Echemos unos commander profe 
Juego mono black y golgari(con proxy)
*/
