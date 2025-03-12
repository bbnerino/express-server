import { AuthController } from "../controller/auth.controller";
import { Request, Router } from "express";
import { generateToken } from "../utils/jwt";

const router = Router();

router.post("/register", async (req: Request, response: any) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const res = await AuthController.register(username, password);
    if (res.error) {
      return response.status(400).json({ message: res.error });
    }

    response.status(201).json({
      message: "User registered successfully",
      user: res,
    });
  } catch (err) {
    response.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req: Request, response: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const res = await AuthController.login(username, password);

    if (res?.error) {
      return response.status(400).json({ message: res.error });
    }

    const token = generateToken(res._id);
    response.json({ message: "Login successful", token });
  } catch (err) {
    response.status(500).json({ message: "Server error" });
  }
});
router.get("/users", async (req: Request, response: any) => {
  try {
    const users = await AuthController.getUsers();

    response.json({ users });
  } catch (err) {
    response.status(500).json({ message: "Server error" });
  }
});

export default router;
