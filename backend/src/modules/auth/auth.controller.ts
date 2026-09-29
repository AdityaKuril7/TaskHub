import type { NextFunction, Request, Response } from "express";
import { authValidations } from "../../validations/auth.js";
import authService from "./auth.service.js";
import type { IAuth } from "../../types/auth.js";
import { ApiError, asyncHandler } from "../../lib/helperFunction.js";

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const result = authValidations.safeParse(body);
    if (!result.success)
      throw new ApiError("Something missing or incorrect !", 400);
    const user = await authService.signup(result.data as IAuth);
    return res.status(201).json({ user });
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const result = authValidations.safeParse(body);
    if (!result.success)
      throw new ApiError("Something missing or incorrect !", 400);

    const token = await authService.login(result.data as IAuth);
    return res.status(200).json({ message: "Login successfully", token });
  },
);
