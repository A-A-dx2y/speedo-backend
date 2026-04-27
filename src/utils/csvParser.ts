import fs from 'fs';
import csv from 'csv-parser';
import { RawGPSRow } from './tripCalculator.js';
import logger from '../config/logger.js';

export class CSVParser {
  static async parse(filePath: string): Promise<RawGPSRow[]> {
    const results: RawGPSRow[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          try {
            const lat = parseFloat(data.latitude ?? data.lat);
            const lng = parseFloat(data.longitude ?? data.lng);
            const timestamp = new Date(data.timestamp ?? data.time);

            const ignition =
              data.ignition?.toLowerCase() === "on" ? "on" : "off";

            if (
              isNaN(lat) ||
              isNaN(lng) ||
              isNaN(timestamp.getTime())
            ) {
              return;
            }

            results.push({
              latitude: lat,
              longitude: lng,
              timestamp,
              ignition
            });

          } catch (error) {
            logger.warn("Invalid row skipped", { error, data });
          }
        })
        .on('end', () => {
          if (results.length === 0) {
            return reject(new Error("CSV file is empty or invalid"));
          }

          resolve(results);
        })
        .on('error', (error) => reject(error));
    });
  }
}