import { Router } from "express";
import crypto, { randomBytes } from "node:crypto";
import { users } from "../index.js";
const userRouter = Router();

userRouter.post("/", async (req, res) => {
  try {
    const { password, username } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Formato incorrecto de petición" });
    }
    let user = users.find((user) => user.username === username);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas. Usuario No Pillado" });
    }
    const [salt, hash] = user.password.split(":");
    const derivedKey = await crypto.scryptSync(password, salt, 64);
    if (derivedKey.toString("hex") !== hash) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas. Password incorrecto" });
    }
    let token = randomBytes(48).toString("hex");
    user.token = token;
    return res.json({
      username: user.username,
      name: user.name,
      token: user.token,
    });
  } catch (err) {
    return res.status(403).json({ message: "ERROR " + err });
  }
});

export default userRouter;
