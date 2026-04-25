import { IUser } from "../../models/user.js";
import { IBaseRepository } from "../base/IBaseRepository.js";


export interface IUserRepository extends IBaseRepository<IUser>{
    findByEmail(email: string): Promise<IUser | null>;
}