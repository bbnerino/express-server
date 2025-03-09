import bcrypt from "bcryptjs";

export interface User {
  id: string;
  username: string;
  password: string;
}

const users: User[] = []; // 간단한 메모리 내 저장소 (DB는 나중에 연결)

const register = async (username: string, password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    id: `${users.length + 1}`,
    username,
    password: hashedPassword,
  };
  users.push(user);

  return user;
};

const login = async (username: string, password: string) => {
  const user = users.find((user) => user.username === username);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

const getUsers = async () => {
  return users;
};

export const AuthController = {
  register,
  login,
  getUsers,
};
