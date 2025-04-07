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
    const reminder = {
      id: crypto.randomUUID(),
      content: content,
      createdAt: Date.now(),
      important: important,
    };
    reminders.push(reminder);
    res.status(201).json(reminder);
  } catch (error) {
    res
      .status(400)
      .json({ error: `ERROR: ${error} datetime:${reminder.createdAt}` });
  }
});

reminderRouter.patch("/:id", (req, res) => {
  try {
    const id = req.params;
    const reminder = reminders.find((rem) => rem.id);

    if (!reminder) {
      return res.status(404);
    }

    const { important, content } = req.body;

    console.log(`${important} + ${content}`);

    if (content) {
      console.log("hay content");
      reminder.content = content;
    }

    if (typeof important === "Boolean") {
      console.log("hay important");
      reminder.important = important;
    }

    return res.json({ message: `Has ingresado el id: ${id} ` });
  } catch (error) {
    return res.status(400).json({ error: `ERROR ${error}` });
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
