export interface ITripResponse {
    id: string;
    userId: string;
    name: string;
    totalDistance: number;
    totalDuration: number;
    idlingDuration: number;
    stoppageDuration: number;
    overSpeedTime: number;
    overSpeedDistance: number;
    avgSpeed: number;
    maxSpeed: number;
    startTime: Date;
    endTime: Date;
}

export interface IGPSPointDTO {
    latitude: number;
    longitude: number;
    timestamp: Date;
    speed: number;
    status: string;
}

export interface ITripDetailResponse extends ITripResponse {
    gpsData: IGPSPointDTO[];
}
