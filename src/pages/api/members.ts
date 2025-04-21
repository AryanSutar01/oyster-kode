import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import Member from '@/models/Member';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await db();

  if (req.method === 'GET') {
    try {
      const members = await Member.find({}).sort({ featured: -1, name: 1 });
      return res.status(200).json(members);
    } catch (error) {
      console.error('Error fetching members:', error);
      return res.status(500).json({ message: 'Error fetching members' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 