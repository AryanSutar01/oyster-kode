import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import Event from '../../../models/Event';
import { authMiddleware } from '../../../lib/authMiddleware';
import { isValidObjectId } from 'mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await db();

    switch (req.method) {
      case 'GET':
        const { search, category, status } = req.query;
        const query: any = {};

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { venue: { $regex: search, $options: 'i' } }
          ];
        }
        if (category) query.category = category;
        if (status) query.status = status;

        const events = await Event.find(query).sort({ date: 1, time: 1 });
        return res.status(200).json(events);

      case 'POST':
        const {
          title,
          description,
          date,
          time,
          venue,
          category: cat,
          status: stat,
          maxParticipants,
          registrationLink,
          requirements,
          image
        } = req.body;
        
        if (!title || !description || !date || !time || !venue || !cat || !stat) {
          return res.status(400).json({ message: 'Required fields are missing' });
        }

        const newEvent = await Event.create({
          title,
          description,
          date,
          time,
          venue,
          category: cat,
          status: stat,
          maxParticipants: maxParticipants || null,
          registrationLink,
          requirements: requirements || [],
          image
        });
        return res.status(201).json(newEvent);

      case 'PUT':
        const { id } = req.query;
        
        if (!id || !isValidObjectId(id)) {
          return res.status(400).json({ message: 'Invalid event ID' });
        }

        const eventExists = await Event.findById(id);
        if (!eventExists) {
          return res.status(404).json({ message: 'Event not found' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true, runValidators: true }
        );
        return res.status(200).json(updatedEvent);

      case 'DELETE':
        const eventId = req.query.id;
        
        if (!eventId || !isValidObjectId(eventId)) {
          return res.status(400).json({ message: 'Invalid event ID' });
        }

        const eventToDelete = await Event.findById(eventId);
        if (!eventToDelete) {
          return res.status(404).json({ message: 'Event not found' });
        }

        await Event.findByIdAndDelete(eventId);
        return res.status(200).json({ message: 'Event deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Events API Error:', error);
    return res.status(500).json({ message: 'Internal server error'});
  }
}

export default authMiddleware(handler); 