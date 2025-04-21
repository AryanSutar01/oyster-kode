import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Development', 'Mobile Apps', 'AI/ML', 'Backend'],
  },
  technologies: [{
    type: String,
    required: [true, 'At least one technology is required'],
  }],
  github: {
    type: String,
    required: [true, 'GitHub link is required'],
  },
  demo: {
    type: String,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// Add text index for search functionality
projectSchema.index({ title: 'text', description: 'text' });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project; 