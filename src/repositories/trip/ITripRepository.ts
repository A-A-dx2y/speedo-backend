import { IBaseRepository } from "../base/IBaseRepository.js";
import { ITrip } from "../../models/tripModel.js";
import { Types } from "mongoose";

export interface ITripData {
    userId: string;
    name: string;
    totalDistance: number;
    totalDuration: number;
    idlingDuration: number;
    stoppageDuration: number;
    overSpeedTime: number;
    overSpeedDistance: number;
    avgSpeed: number;
    maxSpeed: number;
    startTime: Date;
    endTime: Date;
}

export interface ITripRepository extends IBaseRepository<ITrip> {
    findByUserId(userId: string | Types.ObjectId): Promise<ITrip[]>;
    createTrip(data: ITripData): Promise<ITrip>;
}
