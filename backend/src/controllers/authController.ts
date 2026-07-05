import { Request, Response } from 'express';
import User from '../models/User';
import Family from '../models/Family';
import generateToken from '../utils/generateToken';
import { generateInvitationCode } from '../utils/invitationCode';

// @desc    Register a new user and create a family
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, familyName } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let familyId;
    if (familyName) {
      const family = await Family.create({
        name: familyName,
        invitationCode: generateInvitationCode(),
        members: [],
      });
      familyId = family._id;
    }

    const user = await User.create({
      name,
      email,
      password,
      familyId,
      role: familyId ? 'Admin' : 'Member',
    });

    if (user) {
      if (familyId) {
        await Family.findByIdAndUpdate(familyId, { $push: { members: user._id } });
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        familyId: user.familyId,
        token: generateToken(user._id as string),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        familyId: user.familyId,
        token: generateToken(user._id as string),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
export const getUserProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user._id).populate('familyId');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      family: user.familyId,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Join a family via invitation code
// @route   POST /api/auth/join-family
export const joinFamily = async (req: any, res: Response) => {
  const { invitationCode } = req.body;
  const userId = req.user._id;

  try {
    const family = await Family.findOne({ invitationCode });

    if (!family) {
      return res.status(404).json({ message: 'Invalid invitation code' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.familyId) {
      return res.status(400).json({ message: 'User is already in a family' });
    }

    user.familyId = family._id as any;
    user.role = 'Member';
    await user.save();

    family.members.push(user._id as any);
    await family.save();

    res.status(200).json({ 
      message: 'Joined family successfully', 
      family: {
        _id: family._id,
        name: family.name,
        invitationCode: family.invitationCode
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
