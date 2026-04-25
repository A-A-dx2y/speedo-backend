import { inject, injectable } from "inversify";
import type { Request, Response, NextFunction } from "express";
import { DI_TYPES } from "../../di/types.js";
import { IAuthService } from "../../service/auth/IAuthService.js";
import { signupDto } from "../../dto/request/auth/regsiter.dto.js";
import { loginDto } from "../../dto/request/auth/login.dto.js";
import { sendResponse } from "../../utils/responseHelper.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookieHelper.js";
import { HTTP_STATUS } from "../../constants/http-status.constants.js";
import { COMMON_MESSAGES } from "../../constants/common.messages.js";

@injectable()
export class AuthController {
    constructor(
        @inject(DI_TYPES.SERVICES.AUTH_SERVICE) private _authService: IAuthService
    ) {}

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = signupDto.parse(req.body);
            await this._authService.signup(data);
            return sendResponse(res, HTTP_STATUS.CREATED, COMMON_MESSAGES.SIGNUP_SUCCESSFUL);
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = loginDto.parse(req.body);
            const result = await this._authService.login(data);
            
            setAuthCookies(res, result.accessToken, result.refreshToken);
            
            return sendResponse(res, HTTP_STATUS.OK, COMMON_MESSAGES.LOGIN_SUCCESSFUL, {
                user: result.user
            });
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            clearAuthCookies(res)
            return sendResponse(res, HTTP_STATUS.OK, COMMON_MESSAGES.LOGOUT_SUCCESSFUL)
        } catch (error) {
            next(error)
        }
    }
}
