import mongoose, { Schema, Document } from 'mongoose';

export interface IInventory extends Document {
  familyId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  minLevel: number;
  lastUpdated: Date;
  status: 'Full' | 'Sufficient' | 'Low' | 'Critical' | 'Empty';
}

const InventorySchema: Schema = new Schema({
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  location: { type: String },
  minLevel: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Full', 'Sufficient', 'Low', 'Critical', 'Empty'],
    default: 'Sufficient' 
  },
}, { timestamps: true });

export default mongoose.model<IInventory>('Inventory', InventorySchema);
