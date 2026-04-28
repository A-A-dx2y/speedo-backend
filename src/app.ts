import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import requestLogger from "./middlewares/requestLogger.js";



const app = express();

import routes from "./routes/route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(requestLogger)

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))

//? health check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api', routes)

app.use(errorHandler)

export default app;