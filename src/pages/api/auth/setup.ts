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
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Create admin user
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123' // This will be hashed automatically by the model
    });

    res.status(201).json({
      message: 'Admin user created successfully',
      username: admin.username
    });
  } catch (error: any) {
    console.error('Setup error:', error);
    res.status(500).json({ 
      message: 'Error creating admin user',
      error: error.message 
    });
  }
} 