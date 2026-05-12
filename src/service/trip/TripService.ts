import { injectable, inject } from "inversify";
import { ITripService } from "./ITripService.js";
import { DI_TYPES } from "../../di/types.js";
import { ITripRepository } from "../../repositories/trip/ITripRepository.js";
import { IGpsRepository } from "../../repositories/gps/IGPSRepository.js";
import { CSVParser } from "../../utils/csvParser.js";
import { TripCalculator } from "../../utils/tripCalculator.js";
import { TripMapper } from "../../mapper/TripMapper.js";
import { IGeoLocationService } from "../geolocation/IGeoLocationService.js";

@injectable()
export class TripService implements ITripService {
    constructor(
        @inject(DI_TYPES.REPOSITORY.TRIP_REPOSITORY) private tripRepository: ITripRepository,
        @inject(DI_TYPES.REPOSITORY.GPS_REPOSITORY) private gpsRepository: IGpsRepository,
        @inject(DI_TYPES.SERVICES.GEO_LOCATION_SERVICE) private geoLocationService: IGeoLocationService
    ) {}

    async uploadTrip(userId: string, filePath: string, originalName: string) {
        
        const rawData = await CSVParser.parse(filePath);

        const { summary, processedPoints } = TripCalculator.calculate(rawData);

        const baseName = originalName.replace(/\.csv$/i, '');

        let tripName = baseName;

        if (processedPoints.length >= 2) {
            const start = processedPoints[0]!;
            const end = processedPoints[processedPoints.length - 1]!;

            const geocodedName = await this.geoLocationService.getTripName(
                start.latitude,
                start.longitude,
                end.latitude,
                end.longitude
            );

            if (!geocodedName.includes("Unknown")) {
                tripName = geocodedName;
            }
        }

        const newTripData = {
            userId,
            name: tripName,
            ...summary
        };
        
        const savedTrip = await this.tripRepository.createTrip(newTripData);

        
        const gpsDataToInsert = processedPoints.map(point => ({
            tripId: savedTrip._id,
            ...point
        }));

        
        await this.gpsRepository.insertMany(gpsDataToInsert);

        return TripMapper.toDTO(savedTrip);
    }

    async getAllTrips(userId: string) {
        const trips = await this.tripRepository.findByUserId(userId);
        return TripMapper.toDTOList(trips);
    }

    async getTripById(userId: string, tripId: string) {
        const trip = await this.tripRepository.findById(tripId);
        
        if (!trip) {
            throw new Error("Trip not found");
        }

        if (trip.userId.toString() !== userId) {
            throw new Error("Unauthorized access to trip");
        }

        const gpsData = await this.gpsRepository.findByTripId(tripId);

        return TripMapper.toDetailDTO(trip, gpsData);
    }

    async deleteTrip(userId: string, tripId: string) {
        const trip = await this.tripRepository.findById(tripId);

        if (!trip) {
            throw new Error("Trip not found");
        }

        await this.gpsRepository.deleteByTripId(tripId);

        await this.tripRepository.deleteById(tripId);
    }
}
