import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  familyId: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  points: number;
  dueDate?: Date;
}

const TaskSchema: Schema = new Schema({
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['To Do', 'In Progress', 'Completed'], 
    default: 'To Do' 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium' 
  },
  points: { type: Number, default: 10 },
  dueDate: { type: Date },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);
