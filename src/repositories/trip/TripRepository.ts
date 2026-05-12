import { injectable } from "inversify";
import { BaseRepository } from "../base/BaseRepository.js";
import { ITripRepository, ITripData } from "./ITripRepository.js";
import Trip, { ITrip } from "../../models/tripModel.js";
import { Types } from "mongoose";

@injectable()
export class TripRepository extends BaseRepository<ITrip> implements ITripRepository {
    constructor() {
        super(Trip);
    }

    async findByUserId(userId: string | Types.ObjectId): Promise<ITrip[]> {
        return this.model.find({ userId }).sort({ createdAt: -1 }).exec();
    }

    async createTrip(data: ITripData): Promise<ITrip> {
        
        const tripToSave = {
            ...data,
            userId: new Types.ObjectId(data.userId)
        };
        return this.model.create(tripToSave);
    }
}
