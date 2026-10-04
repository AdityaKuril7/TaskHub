import type { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fun: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fun(req, res, next)).catch(next);

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
