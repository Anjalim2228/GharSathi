import mongoose, { Schema, Document } from 'mongoose';

export interface IEmergencyNotification extends Document {
  familyId: mongoose.Types.ObjectId;
  triggeredBy: mongoose.Types.ObjectId;
  type: 'SOS' | 'SafetyCheck' | 'TravelAlert';
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  status: 'Active' | 'Resolved';
  resolvedBy?: mongoose.Types.ObjectId;
  message?: string;
}

const EmergencyNotificationSchema: Schema = new Schema({
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  triggeredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['SOS', 'SafetyCheck', 'TravelAlert'], 
    default: 'SOS' 
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String }
  },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
  resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
}, { timestamps: true });

export default mongoose.model<IEmergencyNotification>('EmergencyNotification', EmergencyNotificationSchema);
