const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Business = require('../models/Business');
const { protect, isBusinessOwner } = require('../middleware/auth');

// @route   GET /api/business
// @desc    Get all businesses with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, city, search, sort, page = 1, limit = 12 } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }
    
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    
    let sortOption = {};
    if (sort === 'rating') {
      sortOption = { rating: -1, reviewCount: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else {
      sortOption = { featured: -1, rating: -1 };
    }
    
    const skip = (page - 1) * limit;
    
    const businesses = await Business.find(query)
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('owner', 'name email');
    
    const total = await Business.countDocuments(query);
    
    res.json({
      success: true,
      count: businesses.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/business/:id
// @desc    Get single business
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('owner', 'name email phone');
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }
    
    res.json({
      success: true,
      business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/business
// @desc    Create new business
// @access  Private (Business Owner)
router.post('/', [protect, isBusinessOwner], [
  body('name').trim().notEmpty().withMessage('Business name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode').notEmpty().withMessage('Zip code is required'),
  body('contact.phone').notEmpty().withMessage('Phone number is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  
  try {
    const businessData = {
      ...req.body,
      owner: req.user.id
    };
    
    const business = await Business.create(businessData);
    
    res.status(201).json({
      success: true,
      business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/business/:id
// @desc    Update business
// @access  Private (Owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    let business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }
    
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this business'
      });
    }
    
    business = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/business/:id
// @desc    Delete business
// @access  Private (Owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }
    
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this business'
      });
    }
    
    await business.deleteOne();
    
    res.json({
      success: true,
      message: 'Business deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/business/my/listings
// @desc    Get current user's businesses
// @access  Private
router.get('/my/listings', protect, async (req, res) => {
  try {
    const businesses = await Business.find({ owner: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: businesses.length,
      businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;