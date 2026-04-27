
export interface IGeoLocationService {
  reverseGeocode(lat: number, lng: number): Promise<string>;
  getTripName(startLat: number, startLng: number, endLat: number, endLng: number): Promise<string>;
}
