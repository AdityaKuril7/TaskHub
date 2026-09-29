import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = ({ id, email }: { id: string; email: string }) => {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error("Missing jwt secret !");
  }
  const token = jwt.sign({ email }, jwt_secret, { expiresIn: "7d" });
  return token;
};

export const verifyToken = (token: string) => {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error("Missing jwt secret !");
  }
  return jwt.verify(token, jwt_secret) as {
    id: string;
    email: string;
  };
};
