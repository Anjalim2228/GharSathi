import mongoose, { Schema, Document } from 'mongoose';

export interface IFamily extends Document {
  name: string;
  invitationCode: string;
  members: mongoose.Types.ObjectId[];
  subscriptionTier: 'Free' | 'Premium';
  createdAt: Date;
  updatedAt: Date;
}

const familySchema = new Schema<IFamily>(
  {
    name: { type: String, required: true },
    invitationCode: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscriptionTier: { type: String, enum: ['Free', 'Premium'], default: 'Free' },
  },
  { timestamps: true }
);

export default mongoose.model<IFamily>('Family', familySchema);
