import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  familyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

const ExpenseSchema: Schema = new Schema({
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Food', 'Electricity', 'Gas', 'Fuel', 'Rent', 'Shopping', 'Medical', 'Education', 'Entertainment', 'Other']
  },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
