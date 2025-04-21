import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import Member from '@/models/Member';
import { authMiddleware } from '@/lib/authMiddleware';
import { isValidObjectId } from 'mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await db();

    switch (req.method) {
      case 'GET':
        const { search, department, year } = req.query;
        const query: any = {};

        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } }
          ];
        }
        if (department) query.department = department;
        if (year) query.year = year;

        const members = await Member.find(query).sort({ createdAt: -1 });
        return res.status(200).json(members);

      case 'POST':
        const { name, role, department: dept, year: yr, skills, image, github, linkedin } = req.body;
        
        if (!name || !role || !dept || !yr) {
          return res.status(400).json({ message: 'Required fields are missing' });
        }

        const newMember = await Member.create({
          name,
          role,
          department: dept,
          year: yr,
          skills: skills || [],
          image,
          github,
          linkedin
        });
        return res.status(201).json(newMember);

      case 'PUT':
        const { id } = req.query;
        
        if (!id || !isValidObjectId(id)) {
          return res.status(400).json({ message: 'Invalid member ID' });
        }

        const memberExists = await Member.findById(id);
        if (!memberExists) {
          return res.status(404).json({ message: 'Member not found' });
        }

        const updatedMember = await Member.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true, runValidators: true }
        );
        return res.status(200).json(updatedMember);

      case 'DELETE':
        const memberId = req.query.id;
        
        if (!memberId || !isValidObjectId(memberId)) {
          return res.status(400).json({ message: 'Invalid member ID' });
        }

        const memberToDelete = await Member.findById(memberId);
        if (!memberToDelete) {
          return res.status(404).json({ message: 'Member not found' });
        }

        await Member.findByIdAndDelete(memberId);
        return res.status(200).json({ message: 'Member deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Members API Error:', error);
    return res.status(500).json({ message: 'Internal server error'});
  }
}

export default authMiddleware(handler); 