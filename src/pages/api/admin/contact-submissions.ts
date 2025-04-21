import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';
import ContactSubmission from '../../../models/ContactSubmission';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await db();

    // Get all submissions, sorted by newest first
    const submissions = await ContactSubmission.find({})
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return res.status(500).json({ message: 'Error fetching submissions' });
  }
} 