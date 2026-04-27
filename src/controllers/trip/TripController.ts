import { inject, injectable } from "inversify";
import { DI_TYPES } from "../../di/types.js";
import { ITripService } from "../../service/trip/ITripService.js";
import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import { sendResponse } from "../../utils/responseHelper.js";
import { HTTP_STATUS } from "../../constants/http-status.constants.js";

@injectable()
export class TripController {

    constructor(
        @inject(DI_TYPES.SERVICES.TRIP_SERVICE) private tripService : ITripService 
    ) {}

    uploadTrip = async (req: Request, res: Response, next: NextFunction) => {
        const filePath = req.file?.path;
        try {

            
            if (!req.file) {
                return sendResponse(res,HTTP_STATUS.BAD_REQUEST, "No Csv file uploaded",null)
            }

            const userId = req.user?.id; 

            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized: User ID missing',null)
            }

            // 3. Let the Service Layer handle the math and database logic
            const tripDTO = await this.tripService.uploadTrip(userId, filePath!, req.file.originalname);

            // 4. Return the clean DTO to the frontend
            return sendResponse(res,HTTP_STATUS.OK,"Trip uploaded and processed successfully",tripDTO);

        } catch (error) {
            // If the CSV is bad or the DB fails, pass it to Express's global error handler
            next(error);
        } finally {
            if(filePath){
                try {
                    await fs.unlink(filePath!);
                } catch (error) {
                    console.error("Failed to delete temp csv file:", error)
                }
            }
        }
    }

    getAllTrips = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized: User ID missing", null);
            }

            const trips = await this.tripService.getAllTrips(userId);
            return sendResponse(res, HTTP_STATUS.OK, "Trips fetched successfully", trips);
        } catch (error) {
            next(error);
        }
    }

    getTripById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized: User ID missing", null);
            }

            const tripId = req.params.id;
            
            if (!tripId || typeof tripId !== 'string') {
                return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid Trip ID", null);
            }

            const tripDetail = await this.tripService.getTripById(userId, tripId);
            
            return sendResponse(res, HTTP_STATUS.OK, "Trip details fetched successfully", tripDetail);
        } catch (error) {
            next(error);
        }
    }

    deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized: User ID missing", null);
            }

            const tripId = req.params.id as string;
            if (!tripId) {
                return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Trip ID missing", null);
            }

            await this.tripService.deleteTrip(userId, tripId);
            return sendResponse(res, HTTP_STATUS.OK, "Trip deleted successfully", null);
        } catch (error) {
            next(error);
        }
    }
}