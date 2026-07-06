import mongoose, { Schema, Document } from 'mongoose';

export interface IEmergencyContact extends Document {
  userId: mongoose.Types.ObjectId;
  familyId: mongoose.Types.ObjectId;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
  isPrimary: boolean;
}

const EmergencyContactSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  isPrimary: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IEmergencyContact>('EmergencyContact', EmergencyContactSchema);
