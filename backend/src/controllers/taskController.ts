import { Request, Response } from 'express';
import Task from '../models/Task';

// @desc    Get all family tasks
// @route   GET /api/tasks
export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ familyId: req.user.familyId }).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
export const createTask = async (req: any, res: Response) => {
  const { title, description, assignedTo, priority, points, dueDate } = req.body;
  try {
    const task = await Task.create({
      familyId: req.user.familyId,
      title,
      description,
      assignedTo,
      priority,
      points,
      dueDate,
    });
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id
export const updateTaskStatus = async (req: any, res: Response) => {
  const { status } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, familyId: req.user.familyId },
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
