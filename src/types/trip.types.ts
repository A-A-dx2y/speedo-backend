export interface RawGPSRow {
  latitude: number;
  longitude: number;
  timestamp: Date;
  ignition: 'on' | 'off';
}

export interface ProcessedGPSPoint {
  latitude: number;
  longitude: number;
  timestamp: Date;
  ignition: 'on' | 'off';
  speed: number; 
  distanceFromPrevious: number; 
  isOverspeeding: boolean;
  status: 'moving' | 'idling' | 'stopped';
}

export interface TripSummary {
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
