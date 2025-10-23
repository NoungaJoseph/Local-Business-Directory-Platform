const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Business = require('../models/Business');
const { protect } = require('../middleware/auth');

// @route   GET /api/review/business/:businessId
// @desc    Get all reviews for a business
// @access  Public
router.get('/business/:businessId', async (req, res) => {
  try {
    const { sort = 'recent', page = 1, limit = 10 } = req.query;
    
    let sortOption = {};
    if (sort === 'recent') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'rating-high') {
      sortOption = { rating: -1, createdAt: -1 };
    } else if (sort === 'rating-low') {
      sortOption = { rating: 1, createdAt: -1 };
    } else if (sort === 'helpful') {
      sortOption = { helpful: -1, createdAt: -1 };
    }
    
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find({ business: req.params.businessId })
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('user', 'name avatar')
      .populate('response.respondedBy', 'name');
    
    const total = await Review.countDocuments({ business: req.params.businessId });
    
    res.json({
      success: true,
      count: reviews.length,
      total,
      pages: Math.ceil(total / limit),
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/review
// @desc    Create a review
// @access  Private
router.post('/', [protect], [
  body('business').notEmpty().withMessage('Business ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title').trim().notEmpty().withMessage('Review title is required'),
  body('comment').trim().notEmpty().withMessage('Review comment is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  
  try {
    const { business, rating, title, comment } = req.body;
    
    // Check if business exists
    const businessExists = await Business.findById(business);
    if (!businessExists) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }
    
    // Check if user already reviewed this business
    const existingReview = await Review.findOne({
      business,
      user: req.user.id
    });
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this business'
      });
    }
    
    const review = await Review.create({
      business,
      user: req.user.id,
      rating,
      title,
      comment
    });
    
    await review.populate('user', 'name avatar');
    
    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/review/:id
// @desc    Update a review
// @access  Private (Review owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }
    
    const { rating, title, comment } = req.body;
    
    review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, title, comment },
      { new: true, runValidators: true }
    ).populate('user', 'name avatar');
    
    res.json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/review/:id
// @desc    Delete a review
// @access  Private (Review owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }
    
    await review.deleteOne();
    
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/review/:id/response
// @desc    Business owner responds to review
// @access  Private (Business owner)
router.post('/:id/response', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('business');
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if user is the business owner
    if (review.business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only business owner can respond to reviews'
      });
    }
    
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Response text is required'
      });
    }
    
    review.response = {
      text,
      respondedBy: req.user.id,
      respondedAt: Date.now()
    };
    
    await review.save();
    await review.populate('response.respondedBy', 'name');
    
    res.json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/review/:id/helpful
// @desc    Mark review as helpful
// @access  Private
router.post('/:id/helpful', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    review.helpful += 1;
    await review.save();
    
    res.json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;