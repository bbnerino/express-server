import jwt from "jsonwebtoken";
import { User } from "../controller/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const generateToken = (user: User) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
};
