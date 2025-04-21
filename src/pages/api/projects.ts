import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import Project from '@/models/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await db();

  if (req.method === 'GET') {
    try {
      const projects = await Project.find({}).sort({ featured: -1, title: 1 });
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ message: 'Error fetching projects' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 