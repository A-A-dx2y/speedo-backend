import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
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

const TripSchema: Schema = new Schema({

  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  name: { 
    type: String, 
    required: true 
  },

  totalDistance: { 
    type: Number, 
    default: 0 
  },
  totalDuration: { 
    type: Number, 
    default: 0 
  },
  stoppageDuration: { 
    type: Number, 
    default: 0 
  },
  idlingDuration: { 
    type: Number, 
    default: 0 
  },
  overSpeedTime: { 
    type: Number, 
    default: 0 
  },
  overSpeedDistance: { 
    type: Number, 
    default: 0 
  },
  avgSpeed: { 
    type: Number, 
    default: 0 
  },
  maxSpeed: { 
    type: Number, 
    default: 0 
  },
  startTime: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
}, { timestamps: true });

export default mongoose.model<ITrip>('Trip', TripSchema);