import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { IGeoLocationService } from "./IGeoLocationService.js";

interface NominatimResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    county?: string;
    state?: string;
  };
}

@injectable()
export class GeoLocationService implements IGeoLocationService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.GEO_LOCATION_URL || "https://nominatim.openstreetmap.org",
      headers: {
        "User-Agent": "Speedo-GPS-App",
      },
      timeout: 5000,
    });
  }

  async reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
      const response = await this.client.get("/reverse", {
        params: {
          format: "json",
          lat,
          lon: lng,
          zoom: 10,
          addressdetails: 1,
        },
      });

      const addr: NominatimResponse["address"] = response.data?.address;

      if (!addr) return "Unknown Location";

      return (
        addr.city ||
        addr.town ||
        addr.village ||
        addr.suburb ||
        addr.county ||
        addr.state ||
        "Unknown Location"
      );
    } catch (error) {
      console.error("Geocoding error:", error);
      return "Unknown Location";
    }
  }

  async getTripName( startLat: number, startLng: number, endLat: number,endLng: number): Promise<string> {
    
    const [startPlace, endPlace] = await Promise.all([
      this.reverseGeocode(startLat, startLng),
      this.reverseGeocode(endLat, endLng),
    ]);

    if (startPlace === endPlace) {
      return startPlace;
    }

    return `${startPlace} to ${endPlace}`;
  }
}
