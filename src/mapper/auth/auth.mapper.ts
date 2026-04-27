import { IUser } from "../../models/user.js";
import { LoginResponseDto } from "../../dto/response/auth/login-response.dto.js";
import { UserResponseDto } from "../../dto/response/auth/userResponseDto.dto.js";

export class AuthMapper {
    static toUserResponseDto(user: IUser): UserResponseDto {
        return {
            id: String(user._id),
            name: user.name,
            email: user.email
        };
    }

    static toLoginResponseDto(user: IUser, accessToken: string, refreshToken: string): LoginResponseDto {
        return {
            accessToken,
            refreshToken,
            user: this.toUserResponseDto(user)
        };
    }
}
