import mongoose, { Schema, Document } from 'mongoose';

export interface IHealthRecord extends Document {
  userId: mongoose.Types.ObjectId;
  familyId: mongoose.Types.ObjectId;
  type: 'Water' | 'Sleep' | 'Steps' | 'BP' | 'Sugar' | 'Weight';
  value: number;
  unit: string;
  date: Date;
}

const HealthRecordSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['Water', 'Sleep', 'Steps', 'BP', 'Sugar', 'Weight']
  },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IHealthRecord>('HealthRecord', HealthRecordSchema);
