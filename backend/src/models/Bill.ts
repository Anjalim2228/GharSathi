import mongoose, { Schema, Document } from 'mongoose';

export interface IBill extends Document {
  familyId: mongoose.Types.ObjectId;
  name: string;
  type: 'Electricity' | 'Water' | 'Gas' | 'Internet' | 'Mobile' | 'Rent' | 'Insurance' | 'EMI' | 'Other';
  amount: number;
  dueDate: Date;
  isRecurring: boolean;
  status: 'Paid' | 'Unpaid';
  reminderSent: boolean;
}

const BillSchema: Schema = new Schema({
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Electricity', 'Water', 'Gas', 'Internet', 'Mobile', 'Rent', 'Insurance', 'EMI', 'Other'],
    required: true 
  },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  isRecurring: { type: Boolean, default: false },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  reminderSent: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IBill>('Bill', BillSchema);
