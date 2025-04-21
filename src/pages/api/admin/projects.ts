import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import Project from '@/models/Project';
import { authMiddleware } from '@/lib/authMiddleware';
import { isValidObjectId } from 'mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await db();

    switch (req.method) {
      case 'GET':
        const { search, category } = req.query;
        const query: any = {};

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        if (category) query.category = category;

        const projects = await Project.find(query).sort({ createdAt: -1 });
        return res.status(200).json(projects);

      case 'POST':
        const { title, description, category: cat, technologies, github, demo, image, featured } = req.body;
        
        if (!title || !description || !cat) {
          return res.status(400).json({ message: 'Required fields are missing' });
        }

        const newProject = await Project.create({
          title,
          description,
          category: cat,
          technologies: technologies || [],
          github,
          demo,
          image,
          featured: featured || false
        });
        return res.status(201).json(newProject);

      case 'PUT':
        const { id } = req.query;
        
        if (!id || !isValidObjectId(id)) {
          return res.status(400).json({ message: 'Invalid project ID' });
        }

        const projectExists = await Project.findById(id);
        if (!projectExists) {
          return res.status(404).json({ message: 'Project not found' });
        }

        const updatedProject = await Project.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true, runValidators: true }
        );
        return res.status(200).json(updatedProject);

      case 'DELETE':
        const projectId = req.query.id;
        
        if (!projectId || !isValidObjectId(projectId)) {
          return res.status(400).json({ message: 'Invalid project ID' });
        }

        const projectToDelete = await Project.findById(projectId);
        if (!projectToDelete) {
          return res.status(404).json({ message: 'Project not found' });
        }

        await Project.findByIdAndDelete(projectId);
        return res.status(200).json({ message: 'Project deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Projects API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ message: 'Internal server error', error: errorMessage });
  }
}

export default authMiddleware(handler); 