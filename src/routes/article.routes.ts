import { Request, Router } from "express";
import { ArticleController } from "../controller/article";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { AuthRequest } from "../utils/api";

const router = Router();

// GET /api/article/{id}

router.get("/:id", async (req: Request, res: any) => {
  const article = await ArticleController.getById(req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json({ message: "Article fetched successfully", article });
});

// GET /api/article

router.get("/", async (req: Request, res: any) => {
  const articles = await ArticleController.getArticles();

  res.json({ message: "Articles fetched successfully", articles });
});

// POST /api/article

router.post("/", async (req: AuthRequest, res: any) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const article = await ArticleController.create(title, content, req.userId);

  res.status(201).json({ message: "Article created successfully", article });
});

// PUT /api/article/{id} - 인증 필요
router.patch("/:id", authenticateJWT, async (req: AuthRequest, res: any) => {
  const { title, content } = req.body;
  const article = await ArticleController.update(
    req.params.id,
    title,
    content,
    req.userId
  );

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json({ message: "Article updated successfully", article });
});

// DELETE /api/article/{id} - 인증 필요
router.delete("/:id", authenticateJWT, async (req: AuthRequest, res: any) => {
  const article = await ArticleController.remove(req.params.id, req.userId);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json({ message: "Article deleted successfully", article });
});

export default router;
