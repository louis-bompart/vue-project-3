import type { Request, Response } from "express";

interface HTTPError extends Error {
  statusCode: number;
}

export function errorHandler(err: HTTPError, _req: Request, res: Response) {
  console.error(err);
  const message = err.message || "Something broke!";
  res.status(err.statusCode || 500).json({ message });
}
