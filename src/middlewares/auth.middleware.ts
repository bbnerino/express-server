import { NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// JWT 인증 미들웨어
export const authenticateJWT = (req: any, res: any, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // 토큰이 유효하면, userId를 req에 추가하고 다음 미들웨어로 이동
  req.userId = decoded.userId;
  next();
};
