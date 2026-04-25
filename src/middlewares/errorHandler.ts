import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/responseHelper.js";
import { AppError } from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { COMMON_ERRORS } from "../constants/errors/common.errors.js";
import logger from "../config/logger.js";

import { z } from "zod";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof AppError) {
        return sendResponse(res, err.statusCode, err.message);
    }

    if (err instanceof z.ZodError) {
        const message = err.issues[0]?.message || "Validation failed";
        return sendResponse(res, HTTP_STATUS.BAD_REQUEST, message);
    }

    logger.error('unhandled Error: ', err);
    return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, COMMON_ERRORS.SOMETHING_WENT_WRONG);

}