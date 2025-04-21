import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['workshop', 'hackathon', 'seminar', 'competition', 'other'],
    default: 'workshop',
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
    required: [true, 'Status is required'],
  },
  maxParticipants: {
    type: Number,
    min: [1, 'Maximum participants must be at least 1'],
  },
  registrationLink: {
    type: String,
  },
  requirements: [{
    type: String,
  }],
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
eventSchema.index({ title: 'text', description: 'text', venue: 'text' });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event; 