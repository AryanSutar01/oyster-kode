import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import Event from '@/models/Event';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await db();

  if (req.method === 'GET') {
    try {
      const events = await Event.find({}).sort({ date: -1, time: -1 });
      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ message: 'Error fetching events' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 