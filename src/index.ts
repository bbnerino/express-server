import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import articleRoutes from "./routes/article.routes";
import mongoose from "mongoose";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/article", articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
