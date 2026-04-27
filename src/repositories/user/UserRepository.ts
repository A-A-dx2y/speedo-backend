import { injectable } from "inversify";
import user, { IUser } from "../../models/user.js";
import { BaseRepository } from "../base/BaseRepository.js";
import { IUserRepository } from "./IUserRepository.js";


@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {

    constructor(){
        super(user)
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.model.findOne({email}).exec()
    }
}