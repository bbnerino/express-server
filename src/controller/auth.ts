import bcrypt from "bcryptjs";
import { UserModel } from "../models/user";

const register = async (username: string, password: string) => {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const _user = await UserModel.findOne({ username });
  if (_user) {
    return { error: "User already exists" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new UserModel({ username, password: hashedPassword });
  await user.save();

  return { id: user._id, username: user.username };
};

const login = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username });
  if (!user) return { error: "User not found" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Invalid password" };

  return {
    _id: user._id,
    username: user.username,
  };
};

const getUsers = async () => {
  const users = await UserModel.find().select("-password -__v");
  return users;
};

export const AuthController = {
  register,
  login,
  getUsers,
};
