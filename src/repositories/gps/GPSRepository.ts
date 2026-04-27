import { injectable } from "inversify";
import { BaseRepository } from "../base/BaseRepository.js";
import { IGpsRepository } from "./IGPSRepository.js";
import GPSData, { IGPSData } from "../../models/gpsData.model.js";
import { Types } from "mongoose";

@injectable()
export class GpsRepository extends BaseRepository<IGPSData> implements IGpsRepository {
    constructor() {
        super(GPSData);
    }

    async insertMany(data: Partial<IGPSData>[]): Promise<void> {
        await this.model.insertMany(data);
    }

    async findByTripId(tripId: string | Types.ObjectId): Promise<IGPSData[]> {
        return this.model.find({ tripId }).sort({ timestamp: 1 }).exec();
    }

    async deleteByTripId(tripId: string | Types.ObjectId): Promise<void> {
        await this.model.deleteMany({ tripId }).exec();
    }
}
