import { users } from "../index.js";

export const userMiddleware = (req, res, next) => {
  try {
    const no = { message: "Permiso Denegado >:(" };
    const tokenAuthorization = req.get("X-Authorization");
    const user = users.find((user) => user.token === tokenAuthorization);
    if (!tokenAuthorization) {
      console.log("No hay token");
      return res.status(401).json(no);
    }
    if (!user) {
      console.log("No hay user");
      return res.status(401).json(no);
    }
    if (tokenAuthorization !== user.token) {
      console.log("token no valido");
      return res.status(401).json(no);
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: `ERROR: ${error}` });
  }
};
