import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Member from '@/models/Member';
import Project from '@/models/Project';
import Event from '@/models/Event';

const sampleMembers = [
  {
    name: "John Doe",
    role: "Full Stack Developer",
    department: "Computer Science",
    year: "2024",
    skills: ["React", "Node.js", "MongoDB"],
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/members/john-doe.jpg",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    featured: true
  },
  {
    name: "Jane Smith",
    role: "AI Engineer",
    department: "Information Technology",
    year: "2023",
    skills: ["Python", "TensorFlow", "Machine Learning"],
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/members/jane-smith.jpg",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    featured: false
  }
];

const sampleProjects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with React frontend and Node.js backend",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/your-org/ecommerce-platform",
    demo: "https://ecommerce-demo.com",
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/projects/ecommerce.jpg",
    featured: true
  },
  {
    title: "AI Chatbot",
    description: "An intelligent chatbot using natural language processing",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "NLTK"],
    github: "https://github.com/your-org/ai-chatbot",
    demo: "https://ai-chatbot-demo.com",
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/projects/chatbot.jpg",
    featured: false
  }
];

const sampleEvents = [
  {
    title: "Web Development Workshop",
    description: "Learn the basics of web development with hands-on projects",
    date: "2024-04-15",
    time: "14:00",
    venue: "Computer Science Department",
    category: "workshop",
    status: "upcoming",
    maxParticipants: 30,
    registrationLink: "https://forms.gle/workshop-registration",
    requirements: ["Laptop", "Basic programming knowledge"],
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/events/web-dev-workshop.jpg",
    featured: true
  },
  {
    title: "Hackathon 2024",
    description: "Annual coding competition for innovative solutions",
    date: "2024-05-20",
    time: "09:00",
    venue: "University Auditorium",
    category: "hackathon",
    status: "upcoming",
    maxParticipants: 100,
    registrationLink: "https://forms.gle/hackathon-registration",
    requirements: ["Team of 2-4 members", "Laptop"],
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/events/hackathon-2024.jpg",
    featured: true
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Clear existing data
    await Member.deleteMany({});
    await Project.deleteMany({});
    await Event.deleteMany({});

    // Insert sample data
    const members = await Member.insertMany(sampleMembers);
    const projects = await Project.insertMany(sampleProjects);
    const events = await Event.insertMany(sampleEvents);

    return res.status(200).json({
      message: 'Sample data inserted successfully',
      members,
      projects,
      events
    });
  } catch (error) {
    console.error('Error inserting sample data:', error);
    return res.status(500).json({ message: 'Error inserting sample data', error });
  }
} 