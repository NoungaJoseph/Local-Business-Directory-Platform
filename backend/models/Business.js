const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 1000
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Restaurant',
      'Salon & Spa',
      'Gym & Fitness',
      'Auto Services',
      'Healthcare',
      'Retail',
      'Education',
      'Professional Services',
      'Home Services',
      'Entertainment',
      'Other'
    ]
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'USA' }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
    website: { type: String }
  },
  hours: {
    monday: { type: String, default: '9:00 AM - 5:00 PM' },
    tuesday: { type: String, default: '9:00 AM - 5:00 PM' },
    wednesday: { type: String, default: '9:00 AM - 5:00 PM' },
    thursday: { type: String, default: '9:00 AM - 5:00 PM' },
    friday: { type: String, default: '9:00 AM - 5:00 PM' },
    saturday: { type: String, default: 'Closed' },
    sunday: { type: String, default: 'Closed' }
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
businessSchema.index({ location: '2dsphere' });
businessSchema.index({ category: 1, rating: -1 });

module.exports = mongoose.model('Business', businessSchema);