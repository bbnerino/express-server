import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import articleRoutes from "./routes/article.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/article", articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
