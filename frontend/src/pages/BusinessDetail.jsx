import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessAPI, reviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaClock, FaHeart, FaShare, FaThumbsUp, FaQuoteLeft } from 'react-icons/fa';

const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchBusinessDetails();
    fetchReviews();
  }, [id]);

  const fetchBusinessDetails = async () => {
    try {
      const { data } = await businessAPI.getById(id);
      setBusiness(data.business);
    } catch (error) {
      console.error('Error fetching business:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await reviewAPI.getByBusiness(id, { sort: 'recent' });
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewAPI.create({
        business: id,
        ...reviewForm
      });
      setShowReviewForm(false);
      setReviewForm({ rating: 5, title: '', comment: '' });
      fetchReviews();
      fetchBusinessDetails();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} text-xl`}
      />
    ));
  };

  const categoryGradients = {
    'Restaurant': 'from-orange-400 to-red-500',
    'Salon & Spa': 'from-pink-400 to-purple-500',
    'Gym & Fitness': 'from-green-400 to-teal-500',
    'Auto Services': 'from-blue-400 to-indigo-500',
    'Healthcare': 'from-red-400 to-pink-500',
    'Retail': 'from-purple-400 to-indigo-500',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">😔</div>
        <p className="text-gray-600 text-xl">Business not found</p>
        <button
          onClick={() => navigate('/businesses')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Businesses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* Hero Section with Gradient */}
      <div className={`relative h-96 bg-gradient-to-br ${categoryGradients[business.category] || 'from-blue-600 to-indigo-600'} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <div className="text-white w-full">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
                {business.category}
              </span>
              {business.featured && (
                <span className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold flex items-center">
                  <FaStar className="mr-1" />
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
              {business.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(business.rating)}
                <span className="ml-3 text-2xl font-bold">{business.rating.toFixed(1)}</span>
                <span className="ml-2 text-lg text-white/90">({business.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-gray-100">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    liked
                      ? 'bg-red-50 text-red-600 border-2 border-red-200'
                      : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-red-300'
                  }`}
                >
                  <FaHeart className={liked ? 'text-red-500' : ''} />
                  <span>{liked ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all"
                >
                  <FaShare />
                  <span>Share</span>
                </button>
                {isAuthenticated && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                  >
                    <FaStar />
                    <span>Write Review</span>
                  </button>
                )}
              </div>
            </div>

            {/* About Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Business</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{business.description}</p>
            </div>

            {/* Review Form */}
            {showReviewForm && isAuthenticated && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaQuoteLeft className="text-blue-600 mr-3" />
                  Share Your Experience
                </h3>
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating</label>
                    <div className="flex space-x-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="text-4xl focus:outline-none transform hover:scale-110 transition-transform"
                        >
                          <FaStar className={star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Review Title</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Sum up your visit in one line"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                    <textarea
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      placeholder="Share details of your experience..."
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Customer Reviews ({reviews.length})
              </h3>
              
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-gray-600 text-lg">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.user?.name?.[0] || 'A'}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{review.user?.name || 'Anonymous'}</p>
                            <div className="flex items-center mt-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                      
                      {review.response && (
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                          <p className="text-sm font-bold text-gray-900 mb-2">Response from {business.name}</p>
                          <p className="text-gray-700 text-sm">{review.response.text}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(review.response.respondedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      
                      {review.helpful > 0 && (
                        <div className="mt-4 flex items-center text-sm text-gray-600">
                          <FaThumbsUp className="text-blue-600 mr-2" />
                          <span>{review.helpful} people found this helpful</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Address</p>
                    <p className="text-gray-700">
                      {business.address.street}<br />
                      {business.address.city}, {business.address.state} {business.address.zipCode}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Phone</p>
                    <a href={`tel:${business.contact.phone}`} className="text-blue-600 hover:underline">
                      {business.contact.phone}
                    </a>
                  </div>
                </div>
                
                {business.contact.email && (
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Email</p>
                      <a href={`mailto:${business.contact.email}`} className="text-blue-600 hover:underline break-all">
                        {business.contact.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {business.contact.website && (
                  <div className="flex items-center space-x-3">
                    <FaGlobe className="text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Website</p>
                      <a 
                        href={business.contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaClock className="text-blue-600 mr-2" />
                Business Hours
              </h3>
              <div className="space-y-3">
                {Object.entries(business.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="capitalize font-semibold text-gray-700">{day}</span>
                    <span className={`text-sm ${hours === 'Closed' ? 'text-red-600' : 'text-gray-900 font-medium'}`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;