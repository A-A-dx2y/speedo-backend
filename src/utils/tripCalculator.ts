import * as geolib from 'geolib';
import { RawGPSRow, ProcessedGPSPoint, TripSummary } from '../types/trip.types.js';


const IDLE_SPEED_THRESHOLD = 1;
const OVER_SPEED_LIMIT = 60;  
const MAX_VALID_SPEED = 200; 

export class TripCalculator {
  static calculate(rawData: RawGPSRow[]): {
    summary: TripSummary;
    processedPoints: ProcessedGPSPoint[];
  } {

    rawData.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    if (rawData.length < 2) {
      return {
        summary: {
          totalDistance: 0,
          totalDuration: 0,
          idlingDuration: 0,
          stoppageDuration: 0,
          overSpeedTime: 0,
          overSpeedDistance: 0,
          avgSpeed: 0,
          maxSpeed: 0,
          startTime: rawData[0]?.timestamp ?? new Date(),
          endTime: rawData[0]?.timestamp ?? new Date(),
        },
        processedPoints: [],
      };
    }

    let totalDistance = 0;
    let idlingDuration = 0;
    let stoppageDuration = 0;
    let overSpeedTime = 0;
    let overSpeedDistance = 0;
    let maxSpeed = 0;

    const processedPoints: ProcessedGPSPoint[] = [];

    const firstPoint = rawData[0]!;

    processedPoints.push({
      latitude: firstPoint.latitude,
      longitude: firstPoint.longitude,
      timestamp: firstPoint.timestamp,
      ignition: firstPoint.ignition,
      speed: 0,
      distanceFromPrevious: 0,
      isOverspeeding: false,
      status: firstPoint.ignition === 'off' ? 'stopped' : 'idling',
    });

    for (let i = 1; i < rawData.length; i++) {
      const prev = rawData[i - 1]!;
      const curr = rawData[i]!;

      const timeDiffSec =
        (curr.timestamp.getTime() - prev.timestamp.getTime()) / 1000;

      if (timeDiffSec <= 0) continue;

      const distance = geolib.getDistance(
        { latitude: prev.latitude, longitude: prev.longitude },
        { latitude: curr.latitude, longitude: curr.longitude }
      );

      let speed = (distance / timeDiffSec) * 3.6;


      if (curr.ignition === 'off') {
        speed = 0;
      }


      if (speed > MAX_VALID_SPEED) continue;

      totalDistance += distance;
      if (speed > maxSpeed) maxSpeed = speed;


      let status: 'moving' | 'idling' | 'stopped';

      const isStopped =
        prev.ignition === 'off' && curr.ignition === 'off';

      const isIdle =
        prev.ignition === 'on' &&
        curr.ignition === 'on' &&
        speed <= IDLE_SPEED_THRESHOLD;

      if (isStopped) {
        status = 'stopped';
        stoppageDuration += timeDiffSec;
      } else if (isIdle) {
        status = 'idling';
        idlingDuration += timeDiffSec;
      } else {
        status = 'moving';
      }


      let isOverspeeding = false;
      if (speed > OVER_SPEED_LIMIT) {
        isOverspeeding = true;
        overSpeedTime += timeDiffSec;
        overSpeedDistance += distance;
      }

      processedPoints.push({
        latitude: curr.latitude,
        longitude: curr.longitude,
        timestamp: curr.timestamp,
        ignition: curr.ignition,
        speed: parseFloat(speed.toFixed(2)),
        distanceFromPrevious: distance,
        isOverspeeding,
        status,
      });
    }

    const startTime = rawData[0]!.timestamp;
    const endTime = rawData[rawData.length - 1]!.timestamp;

    const totalDuration =
      (endTime.getTime() - startTime.getTime()) / 1000;

    const avgSpeed =
      totalDuration > 0
        ? (totalDistance / 1000) / (totalDuration / 3600)
        : 0;

    return {
      summary: {
        totalDistance,
        totalDuration,
        idlingDuration,
        stoppageDuration,
        overSpeedTime,
        overSpeedDistance,
        avgSpeed: parseFloat(avgSpeed.toFixed(2)),
        maxSpeed: parseFloat(maxSpeed.toFixed(2)),
        startTime,
        endTime,
      },
      processedPoints,
    };
  }
}