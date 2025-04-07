import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import userRouter from "./user.routers.js";
import reminderRouter from "./reminder.routers.js";

const router = Router();

router.use("/auth/login", userRouter);
router.use("/reminders", userMiddleware, reminderRouter);

export default router;
