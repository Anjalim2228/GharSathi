import mongoose, { Schema, Document } from 'mongoose';

export interface IGrocery extends Document {
  familyId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: string;
  price: number;
  priority: 'Low' | 'Medium' | 'High';
  isFavorite: boolean;
  status: 'Pending' | 'Bought';
  lastBought?: Date;
}

const GrocerySchema: Schema = new Schema({
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  quantity: { type: String, required: true },
  price: { type: Number, default: 0 },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  isFavorite: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending', 'Bought'], default: 'Pending' },
  lastBought: { type: Date },
}, { timestamps: true });

export default mongoose.model<IGrocery>('Grocery', GrocerySchema);
