import { Router } from "express";
import container from "../../../di/index.js";
import { TripController } from "../../../controllers/trip/TripController.js";
import { DI_TYPES } from "../../../di/types.js";
import { upload } from "../../../middlewares/upload.middleware.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const router = Router();

const tripController = container.get<TripController>(DI_TYPES.CONTROLLERS.TRIP_CONTROLLER);


router.post("/upload", authMiddleware, upload.single('file'), tripController.uploadTrip);

// Retrieval Routes
router.get("/", authMiddleware, tripController.getAllTrips);
router.get("/:id", authMiddleware, tripController.getTripById);
router.delete("/:id", authMiddleware, tripController.deleteTrip);

export default router;
