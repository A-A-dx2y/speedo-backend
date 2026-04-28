import 'reflect-metadata'
import dotenv from "dotenv";
import logger from "./config/logger.js";

dotenv.config()

import http from 'http'
import connectDB from './config/dbconfig.js';

import app from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        const httpServer = http.createServer(app)

        httpServer.listen(PORT, () => {
            logger.info(`Server is running on port http://localhost:${PORT}`)
        })
    } catch (error) {
        logger.error(`Server failed to start: ${error}`)
        process.exit(1)
    }
}

startServer()