import { ITrip } from "../models/tripModel.js";
import { IGPSData } from "../models/gpsData.model.js";
import { ITripResponse, ITripDetailResponse } from "../dto/response/trip/tripResponse.dto.js";

export class TripMapper {
    static toDTO(trip: ITrip): ITripResponse {
        return {
            id: trip._id ? trip._id.toString() : '',
            userId: trip.userId.toString(),
            name: trip.name,
            totalDistance: trip.totalDistance,
            totalDuration: trip.totalDuration,
            idlingDuration: trip.idlingDuration,
            stoppageDuration: trip.stoppageDuration,
            overSpeedTime: trip.overSpeedTime,
            overSpeedDistance: trip.overSpeedDistance,
            avgSpeed: trip.avgSpeed,
            maxSpeed: trip.maxSpeed,
            startTime: trip.startTime,
            endTime: trip.endTime
        };
    }

    static toDTOList(trips: ITrip[]): ITripResponse[] {
        return trips.map(trip => this.toDTO(trip));
    }

    static toDetailDTO(trip: ITrip, gpsData: IGPSData[]): ITripDetailResponse {
        return {
            ...this.toDTO(trip),
            gpsData: gpsData.map(point => ({
                latitude: point.latitude,
                longitude: point.longitude,
                timestamp: point.timestamp,
                speed: point.speed,
                status: point.status,
                ignition: point.ignition,
                isOverspeeding: point.isOverspeeding
            }))
        };
    }
}
