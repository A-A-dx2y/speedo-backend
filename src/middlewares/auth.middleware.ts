import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwtHelper.js";
import { sendResponse } from "../utils/responseHelper.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Extract the access token from the cookies
        const token = req.cookies?.accessToken;

        if (!token) {
            return sendResponse(res,HTTP_STATUS.UNAUTHORIZED,"Unauthorized: No access token provided",null)
        }

        // 2. Verify the token. This will throw an error if the token is invalid or expired.
        const decoded = verifyAccessToken(token);

        // 3. Attach the user ID to the request
        req.user = {
            id: decoded.userId
        };

        // 4. Move to the next function (the controller or the upload middleware)
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
        return;
    }
};
