import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import { IAuthService } from "./IAuthService.js";
import { DI_TYPES } from "../../di/types.js";
import { IUserRepository } from "../../repositories/user/IUserRepository.js";
import { signupDto } from "../../dto/request/auth/regsiter.dto.js";
import { loginDto } from "../../dto/request/auth/login.dto.js";
import { LoginResponseDto } from "../../dto/response/auth/login-response.dto.js";
import { AppError } from "../../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtHelper.js";
import { AuthMapper } from "../../mapper/auth/auth.mapper.js";
import { UserResponseDto } from "../../dto/response/auth/userResponseDto.dto.js";

@injectable()
export class AuthService implements IAuthService {

    constructor(
        @inject(DI_TYPES.REPOSITORY.USER_REPOSITORY) private _userRepo: IUserRepository
    ) { }

    async signup(data: signupDto): Promise<void> {
        const existingUser = await this._userRepo.findByEmail(data.email);
        if (existingUser) {
            throw new AppError("User already exists with this email", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await this._userRepo.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });
    }

    async login(data: loginDto): Promise<LoginResponseDto> {
        const user = await this._userRepo.findByEmail(data.email);
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!isPasswordMatch) {
            throw new AppError("Invalid email or password", 401);
        }

        const accessToken = generateAccessToken(String(user._id));
        const refreshToken = generateRefreshToken(String(user._id));

        return AuthMapper.toLoginResponseDto(user, accessToken, refreshToken);
    }
}