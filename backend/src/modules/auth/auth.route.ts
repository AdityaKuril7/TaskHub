import { Router } from "express";
import { login, signup } from "./auth.controller.js";

export const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/signup").post(signup);
