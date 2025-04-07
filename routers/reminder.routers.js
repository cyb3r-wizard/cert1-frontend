import { Router } from "express";
const reminderRouter = Router();

reminderRouter.get("reminders", (req, res) => {
  res.json({ message: "AUTORIZADO: AQUI SE MOSTRARÁN LAS TAREAS" });
});

reminderRouter.post("reminders", (req, res) => {
  res.json({ message: "XAO PESCAO" });
});

reminderRouter.patch("reminders/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Has ingresado el id: ${id} ` });
});

reminderRouter.delete("reminders/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Has borrado el id ${id}` });
});

export default reminderRouter;
