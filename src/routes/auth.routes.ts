import { AuthController } from "../controller/auth";
import { Request, Router } from "express";
import { generateToken } from "../utils/jwt";

const router = Router();

router.post("/register", async (req: Request, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await AuthController.register(username, password);
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req: Request, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await AuthController.login(username, password);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/users", async (req: Request, res: any) => {
  try {
    const users = await AuthController.getUsers();

    res.json({ message: "Users fetched successfully", users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
