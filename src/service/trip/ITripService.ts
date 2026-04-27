import { ITripResponse, ITripDetailResponse } from "../../dto/response/trip/tripResponse.dto.js";

export interface ITripService {
    uploadTrip(userId: string, filePath: string, originalName: string): Promise<ITripResponse>;
    getAllTrips(userId: string): Promise<ITripResponse[]>;
    getTripById(userId: string, tripId: string): Promise<ITripDetailResponse>;
    deleteTrip(userId: string, tripId: string): Promise<void>;
}
