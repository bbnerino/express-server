import { Request, Router } from "express";
import { ArticleController } from "../controller/article";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { AuthRequest } from "../utils/api";

const router = Router();

// GET /api/article/{id}

router.get("/:id", async (req: Request, response: any) => {
  const res = await ArticleController.getById(req.params.id);

  if (res.error) {
    return response.status(404).json({ message: res.error });
  }
  console.log("asdfjkljs", res);

  response.json({ article: res });
});

// GET /api/article

router.get("/", async (req: Request, response: any) => {
  const res = await ArticleController.getArticles();
  if (res.error) {
    return response.status(404).json({ message: res.error });
  }

  response.json({ message: "Articles fetched successfully", articles: res });
});

// POST /api/article

router.post("/", authenticateJWT, async (req: AuthRequest, response: any) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return response
      .status(400)
      .json({ message: "Title and content are required" });
  }

  const res = await ArticleController.create(title, content, req.userId);
  if (res.error) {
    return response.status(400).json({ message: res.error });
  }

  response.status(201).json({ article: res });
});

// PUT /api/article/{id} - 인증 필요
router.patch(
  "/:id",
  authenticateJWT,
  async (req: AuthRequest, response: any) => {
    const { title, content } = req.body;
    const res = await ArticleController.update(
      req.params.id,
      title,
      content,
      req.userId
    );

    if (res.error) {
      return response.status(404).json({ message: res.error });
    }

    response.json({ message: "Article updated successfully", article: res });
  }
);

// DELETE /api/article/{id} - 인증 필요
router.delete(
  "/:id",
  authenticateJWT,
  async (req: AuthRequest, response: any) => {
    const res = await ArticleController.remove(req.params.id, req.userId);

    if (res.error) {
      return response.status(404).json({ message: res.error });
    }

    response.json({ message: "Article deleted successfully" });
  }
);

export default router;
