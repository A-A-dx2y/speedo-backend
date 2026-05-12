import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwtHelper.js";
import { sendResponse } from "../utils/responseHelper.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.cookies?.accessToken;

        if (!token) {
            return sendResponse(res,HTTP_STATUS.UNAUTHORIZED,"Unauthorized: No access token provided",null)
        }

        const decoded = verifyAccessToken(token);

        req.user = {
            id: decoded.userId
        };
        
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
        return;
    }
};
