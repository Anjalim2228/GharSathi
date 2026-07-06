import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicine extends Document {
  familyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  dosage: string;
  frequency: string;
  reminders: string[]; // e.g. ["08:00", "20:00"]
  stock: number;
  unit: string;
  expiryDate?: Date;
  photo?: string;
  instructions?: string;
}

const MedicineSchema: Schema = new Schema({
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  reminders: [{ type: String }],
  stock: { type: Number, default: 0 },
  unit: { type: String, default: 'tablets' },
  expiryDate: { type: Date },
  photo: { type: String },
  instructions: { type: String },
}, { timestamps: true });

export default mongoose.model<IMedicine>('Medicine', MedicineSchema);
