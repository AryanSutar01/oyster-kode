import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
  },
  skills: [{
    type: String,
  }],
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// Add text index for search functionality
memberSchema.index({ name: 'text', role: 'text', department: 'text' });

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

export default Member; 