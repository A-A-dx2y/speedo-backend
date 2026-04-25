import { UserResponseDto } from "./userResponseDto.dto.js";

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDto;
}
