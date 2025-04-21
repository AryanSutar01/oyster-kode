import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import ContactSubmission from '../../models/ContactSubmission';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await db();

    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new submission
    const submission = await ContactSubmission.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ message: 'Error submitting form' });
  }
} 