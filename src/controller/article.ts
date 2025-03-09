interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
}

const articles: Article[] = []; // 간단한 메모리 내 저장소 (DB는 나중에 연결)

const create = async (title: string, content: string, userId: string) => {
  const article = {
    id: `${articles.length + 1}`,
    title,
    content,
    userId,
  } as Article;
  articles.push(article);

  return article;
};

const update = async (
  id: string,
  title: string,
  content: string,
  userId: string
) => {
  const article = articles.find((article) => article.id === id);
  if (!article) return null;

  if (article.userId !== userId) {
    return null; // 사용자가 작성한 글만 수정 가능
  }

  article.title = title;
  article.content = content;

  return article;
};

const remove = async (id: string, userId: string) => {
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) return null;

  const article = articles[index];
  if (article.userId !== userId) {
    return null; // 사용자가 작성한 글만 삭제 가능
  }

  articles.splice(index, 1);

  return id;
};

const getArticles = async () => {
  return articles;
};
const getById = async (id: string) => {
  return articles.find((article) => article.id === id);
};

export const ArticleController = {
  getArticles,
  create,
  update,
  remove,
  getById,
};
