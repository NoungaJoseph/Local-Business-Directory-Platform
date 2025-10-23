const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    maxlength: 500
  },
  response: {
    text: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate reviews from same user for same business
reviewSchema.index({ business: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = async function(businessId) {
  const stats = await this.aggregate([
    {
      $match: { business: businessId }
    },
    {
      $group: {
        _id: '$business',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Business').findByIdAndUpdate(businessId, {
      rating: Math.round(stats[0].averageRating * 10) / 10,
      reviewCount: stats[0].reviewCount
    });
  } else {
    await mongoose.model('Business').findByIdAndUpdate(businessId, {
      rating: 0,
      reviewCount: 0
    });
  }
};

// Update business rating after save
reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.business);
});

// Update business rating after delete
reviewSchema.post('remove', function() {
  this.constructor.calculateAverageRating(this.business);
});

module.exports = mongoose.model('Review', reviewSchema);