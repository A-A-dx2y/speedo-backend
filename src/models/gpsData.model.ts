import mongoose, { Schema, Document } from 'mongoose';

export interface IGPSData extends Document {
  tripId: mongoose.Types.ObjectId;
  latitude: number;
  longitude: number;
  timestamp: Date;
  ignition: 'on' | 'off';
  speed: number; 
  distanceFromPrevious: number; 
  isOverspeeding: boolean;
  status: 'moving' | 'idling' | 'stopped';
}

const GPSDataSchema: Schema = new Schema({
  
  tripId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Trip', 
    required: true, 
    index: true 
  },

  latitude: { 
    type: Number, 
    required: true 
  },

  longitude: { 
    type: Number, 
    required: true 
  },

  timestamp: { type: Date, required: true },

  ignition: { 
    type: String, 
    enum: ['on', 'off'], 
    required: true 
  },
  
  speed: { 
    type: Number, 
    default: 0 
  },

  distanceFromPrevious: { 
    type: Number, 
    default: 0 
  },

  isOverspeeding: { 
    type: Boolean, 
    default: false 
  },

  status: {
     type: String, 
     enum: ['moving', 'idling', 'stopped'], 
     required: true },

}, { timestamps: true });

// Create an index for faster map rendering
GPSDataSchema.index({ tripId: 1, timestamp: 1 });

export default mongoose.model<IGPSData>('GPSData', GPSDataSchema);