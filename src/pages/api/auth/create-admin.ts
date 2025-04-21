import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Check if admin already exists
    const adminExists = await Admin.findOne({});
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create first admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123', // This will be hashed automatically by our model
    });

    res.status(201).json({
      message: 'Admin created successfully',
      username: admin.username,
    });
  } catch (error: any) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 