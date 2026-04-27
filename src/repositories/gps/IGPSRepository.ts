import { IBaseRepository } from "../base/IBaseRepository.js";
import { IGPSData } from "../../models/gpsData.model.js";
import { Types } from "mongoose";

export interface IGpsRepository extends IBaseRepository<IGPSData> {
    insertMany(data: Partial<IGPSData>[]): Promise<void>;
    findByTripId(tripId: string | Types.ObjectId): Promise<IGPSData[]>;
    deleteByTripId(tripId: string | Types.ObjectId): Promise<void>;
}
