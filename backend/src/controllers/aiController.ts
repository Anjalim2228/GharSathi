import { Response } from 'express';
import { aiService } from '../services/aiService';
import Expense from '../models/Expense';
import Task from '../models/Task';
import HealthRecord from '../models/HealthRecord';

// @desc    Get smart daily briefing
// @route   GET /api/ai/briefing
export const getDailyBriefing = async (req: any, res: Response) => {
  try {
    const familyId = req.user.familyId;
    
    // Fetch context for AI
    const [expenses, tasks, health] = await Promise.all([
      Expense.find({ familyId }).sort({ date: -1 }).limit(5),
      Task.find({ familyId, status: { $ne: 'Completed' } }).limit(5),
      HealthRecord.find({ familyId }).sort({ date: -1 }).limit(5),
    ]);

    // Mock weather for now
    const weather = { temp: 28, condition: 'Clear', city: 'Paris' };

    const briefing = await aiService.generateBriefing({
      name: req.user.name,
      expenses,
      tasks,
      health,
      inventory: [],
      weather,
    });

    res.status(200).json(briefing);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Chat with AI
// @route   POST /api/ai/chat
export const chatWithAI = async (req: any, res: Response) => {
  try {
    const { message, history } = req.body;
    const familyId = req.user.familyId;

    // Fetch context
    const [expenses, tasks] = await Promise.all([
      Expense.find({ familyId }).sort({ date: -1 }).limit(10),
      Task.find({ familyId, status: { $ne: 'Completed' } }),
    ]);

    const response = await aiService.chat(message, history || [], {
      name: req.user.name,
      familyData: { expenses, tasks }
    });

    res.status(200).json({ response });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
