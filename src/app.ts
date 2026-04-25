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
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use('/api', routes)

app.use(errorHandler)

export default app;