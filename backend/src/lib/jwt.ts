import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request } from "express";
import { ApiError } from "./helperFunction.js";
dotenv.config();

export const generateToken = ({ id, email }: { id: string; email: string }) => {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error("Missing jwt secret !");
  }
  const token = jwt.sign({ id,email }, jwt_secret, { expiresIn: "7d" });
  return token;
};

export const verifyToken = (req:Request) => {
  const token = req.cookies.token; 
  if(!token){
    throw new ApiError("Unauthorized",401)
  }
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new ApiError("Missing jwt secret !",400);
  }
  return jwt.verify(token, jwt_secret) as {
    id: string;
    email: string;
  };
};
