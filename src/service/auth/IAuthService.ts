import { loginDto } from "../../dto/request/auth/login.dto.js";
import { signupDto } from "../../dto/request/auth/regsiter.dto.js";
import { LoginResponseDto } from "../../dto/response/auth/login-response.dto.js";
import { UserResponseDto } from "../../dto/response/auth/userResponseDto.dto.js";

export interface IAuthService {
    
    signup(data : signupDto) : Promise<void>

    login(data: loginDto) : Promise<LoginResponseDto>
}

