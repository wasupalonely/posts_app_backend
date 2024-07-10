import { NextFunction, Request, Response } from "express";

// MAYBE USEFUL----
export function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["api-key"];
    if (!apiKey) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    next();
}