import mongoose from "mongoose";
import { ArticleModel } from "../models/articles";

const create = async (title: string, content: string, userId: string) => {
  const article = new ArticleModel({ title, content, userId });
  const _article = await article.save();
  return _article as any;
};

const update = async (
  id: string,
  title: string,
  content: string,
  userId: string
) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) {
    return { error: "Invalid article ID" };
  }
  const article = await ArticleModel.findById(id);

  if (!article) {
    return { error: "Article not found" };
  }

  if (article.userId !== userId) {
    return { error: "You are not authorized to update this article" };
  }

  article.title = title;
  article.content = content;
  const _article = await article.save();

  return _article as any;
};

const remove = async (id: string, userId: string) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) {
    return { error: "Invalid article ID" };
  }
  const article = await ArticleModel.findById(id);

  if (!article) {
    return { error: "Article not found" };
  }

  if (article.userId !== userId) {
    return { error: "You are not authorized to delete this article" };
  }

  const _article = await article.deleteOne();
  return _article as any;
};

const getArticles = async () => {
  const articles = await ArticleModel.find();
  return articles as any;
};

const getById = async (id: string) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) {
    return { error: "Invalid article ID" };
  }
  const article = await ArticleModel.findById(id);
  return article as any;
};

const getArticlesByUserId = async (userId: string) => {
  const articles = await ArticleModel.find({ userId });

  return articles as any;
};

export const ArticleController = {
  getArticles,
  create,
  update,
  remove,
  getById,
  getArticlesByUserId,
};
