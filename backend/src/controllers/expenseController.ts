import { Request, Response } from 'express';
import Expense from '../models/Expense';

// @desc    Get all family expenses
// @route   GET /api/expenses
export const getExpenses = async (req: any, res: Response) => {
  try {
    const expenses = await Expense.find({ familyId: req.user.familyId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new expense
// @route   POST /api/expenses
export const createExpense = async (req: any, res: Response) => {
  const { amount, category, description, date } = req.body;
  try {
    const expense = await Expense.create({
      familyId: req.user.familyId,
      userId: req.user._id,
      amount,
      category,
      description,
      date: date || Date.now(),
    });
    res.status(201).json(expense);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get expense summary for dashboard
// @route   GET /api/expenses/summary
export const getExpenseSummary = async (req: any, res: Response) => {
  try {
    const familyId = req.user.familyId;
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const summary = await Expense.aggregate([
      { $match: { familyId, date: { $gte: startOfMonth } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    const totalSpent = summary.reduce((acc, curr) => acc + curr.total, 0);

    res.status(200).json({
      totalSpent,
      breakdown: summary
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
