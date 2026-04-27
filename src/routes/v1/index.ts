import { Router } from "express";
import AuthRoutes from "./auth/auth.routes.js";
import TripRoutes from "./trip/trip.routes.js";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/trip", TripRoutes);

export default router;