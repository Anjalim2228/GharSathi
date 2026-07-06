import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicalProfile extends Document {
  userId: mongoose.Types.ObjectId;
  familyId: mongoose.Types.ObjectId;
  bloodGroup: string;
  age: number;
  height: number;
  weight: number;
  allergies: string[];
  chronicDiseases: string[];
  currentMedicines: string[];
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    expiryDate: Date;
  };
  emergencyContactId?: mongoose.Types.ObjectId;
}

const MedicalProfileSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  bloodGroup: { type: String },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  allergies: [{ type: String }],
  chronicDiseases: [{ type: String }],
  currentMedicines: [{ type: String }],
  insuranceDetails: {
    provider: { type: String },
    policyNumber: { type: String },
    expiryDate: { type: Date },
  },
  emergencyContactId: { type: Schema.Types.ObjectId, ref: 'EmergencyContact' },
}, { timestamps: true });

export default mongoose.model<IMedicalProfile>('MedicalProfile', MedicalProfileSchema);
