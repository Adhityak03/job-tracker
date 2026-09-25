
import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
}
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
};

export default errorHandler;