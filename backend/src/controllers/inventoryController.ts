import { Request, Response } from 'express';
import Inventory from '../models/Inventory';

// @desc    Get all family inventory
// @route   GET /api/inventory
export const getInventory = async (req: any, res: Response) => {
  try {
    const inventory = await Inventory.find({ familyId: req.user.familyId });
    res.status(200).json(inventory);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add or update inventory item
// @route   POST /api/inventory
export const updateInventoryItem = async (req: any, res: Response) => {
  const { name, category, quantity, unit, location, minLevel } = req.body;
  try {
    let status = 'Sufficient';
    if (quantity <= 0) status = 'Empty';
    else if (quantity <= minLevel / 2) status = 'Critical';
    else if (quantity <= minLevel) status = 'Low';
    else if (quantity >= minLevel * 3) status = 'Full';

    const item = await Inventory.findOneAndUpdate(
      { familyId: req.user.familyId, name },
      { 
        category, 
        quantity, 
        unit, 
        location, 
        minLevel, 
        status,
        lastUpdated: Date.now() 
      },
      { upsert: true, new: true }
    );
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get low stock items
// @route   GET /api/inventory/low-stock
export const getLowStockItems = async (req: any, res: Response) => {
  try {
    const items = await Inventory.find({ 
      familyId: req.user.familyId, 
      status: { $in: ['Low', 'Critical', 'Empty'] } 
    });
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
