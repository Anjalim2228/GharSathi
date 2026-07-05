import { Request, Response } from 'express';
import HealthRecord from '../models/HealthRecord';

// @desc    Get family health records
// @route   GET /api/health-records
export const getHealthRecords = async (req: any, res: Response) => {
  try {
    const records = await HealthRecord.find({ familyId: req.user.familyId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add health record
// @route   POST /api/health-records
export const addHealthRecord = async (req: any, res: Response) => {
  const { type, value, unit, date } = req.body;
  try {
    const record = await HealthRecord.create({
      userId: req.user._id,
      familyId: req.user.familyId,
      type,
      value,
      unit,
      date: date || Date.now(),
    });
    res.status(201).json(record);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get health summary
// @route   GET /api/health-records/summary
export const getHealthSummary = async (req: any, res: Response) => {
  try {
    const familyId = req.user.familyId;
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const summary = await HealthRecord.aggregate([
      { $match: { familyId, date: { $gte: startOfWeek } } },
      { $group: { _id: { type: '$type', userId: '$userId' }, avgValue: { $avg: '$value' } } }
    ]);

    res.status(200).json(summary);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
