import { inject, injectable } from "inversify";
import { DI_TYPES } from "../../di/types.js";
import { ITripService } from "../../service/trip/ITripService.js";
import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import { sendResponse } from "../../utils/responseHelper.js";
import { HTTP_STATUS } from "../../constants/http-status.constants.js";
import { TRIP_MESSAGES } from "../../constants/trip.messages.js";
import { COMMON_MESSAGES } from "../../constants/common.messages.js";
import logger from "../../config/logger.js";



@injectable()
export class TripController {

    constructor(
        @inject(DI_TYPES.SERVICES.TRIP_SERVICE) private tripService : ITripService 
    ) {}

    uploadTrip = async (req: Request, res: Response, next: NextFunction) => {
        const filePath = req.file?.path;
        try {

            
            if (!req.file) {
                return sendResponse(res,HTTP_STATUS.BAD_REQUEST, TRIP_MESSAGES.NO_FILE_UPLOADED, null)
            }

            const userId = req.user?.id; 

            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, COMMON_MESSAGES.UNAUTHORIZED, null)
            }

            
            const tripDTO = await this.tripService.uploadTrip(userId, filePath!, req.file.originalname);

            return sendResponse(res,HTTP_STATUS.OK, TRIP_MESSAGES.TRIP_UPLOADED, tripDTO);

        } catch (error) {
            next(error);
        } finally {
            if(filePath){
                try {
                    await fs.unlink(filePath!);
                } catch (err) {
                    logger.error("Failed to delete temp csv file:", err)
                }
            }
        }
    }

    getAllTrips = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, COMMON_MESSAGES.UNAUTHORIZED, null);
            }

            const trips = await this.tripService.getAllTrips(userId);
            return sendResponse(res, HTTP_STATUS.OK, TRIP_MESSAGES.TRIP_FETCHED, trips);
        } catch (error) {
            next(error);
        }
    }

    getTripById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, COMMON_MESSAGES.UNAUTHORIZED, null);
            }

            const tripId = req.params.id;
            
            if (!tripId || typeof tripId !== 'string') {
                return sendResponse(res, HTTP_STATUS.BAD_REQUEST, TRIP_MESSAGES.INVALID_TRIP_ID, null);
            }

            const tripDetail = await this.tripService.getTripById(userId, tripId);
            
            return sendResponse(res, HTTP_STATUS.OK, TRIP_MESSAGES.TRIP_DETAILS_FETCHED, tripDetail);
        } catch (error) {
            next(error);
        }
    }

    deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, COMMON_MESSAGES.UNAUTHORIZED, null);
            }

            const tripId = req.params.id as string;
            if (!tripId) {
                return sendResponse(res, HTTP_STATUS.BAD_REQUEST, TRIP_MESSAGES.TRIP_ID_MISSING, null);
            }

            await this.tripService.deleteTrip(userId, tripId);
            return sendResponse(res, HTTP_STATUS.OK, TRIP_MESSAGES.TRIP_DELETED, null);
        } catch (error) {
            next(error);
        }
    }
}