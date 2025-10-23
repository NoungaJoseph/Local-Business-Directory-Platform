import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { businessAPI } from '../services/api';
import { FaStar, FaMapMarkerAlt, FaPhone, FaFilter, FaSearch, FaHeart } from 'react-icons/fa';

const BusinessList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    sort: 'featured'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  const categories = [
    'All',
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
  ];

  const categoryIcons = {
    'Restaurant': '🍽️',
    'Salon & Spa': '💇',
    'Gym & Fitness': '💪',
    'Auto Services': '🚗',
    'Healthcare': '🏥',
    'Retail': '🛍️',
    'Education': '📚',
    'Professional Services': '💼',
    'Home Services': '🏠',
    'Entertainment': '🎭',
    'Other': '🏢'
  };

  const categoryGradients = {
    'Restaurant': 'from-orange-400 to-red-500',
    'Salon & Spa': 'from-pink-400 to-purple-500',
    'Gym & Fitness': 'from-green-400 to-teal-500',
    'Auto Services': 'from-blue-400 to-indigo-500',
    'Healthcare': 'from-red-400 to-pink-500',
    'Retail': 'from-purple-400 to-indigo-500',
    'Education': 'from-yellow-400 to-orange-500',
    'Professional Services': 'from-cyan-400 to-blue-500',
    'Home Services': 'from-teal-400 to-green-500',
    'Entertainment': 'from-fuchsia-400 to-purple-500',
    'Other': 'from-gray-400 to-gray-500'
  };

  useEffect(() => {
    fetchBusinesses();
  }, [filters, pagination.page]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        category: filters.category === 'All' ? '' : filters.category,
        page: pagination.page,
        limit: 12
      };
      
      const { data } = await businessAPI.getAll(params);
      setBusinesses(data.businesses);
      setPagination({
        page: data.currentPage,
        pages: data.pages,
        total: data.total
      });
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPagination({ ...pagination, page: 1 });
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Discover Local Businesses
          </h1>
          <p className="text-gray-600 text-lg">
            Explore {pagination.total} verified businesses in your area
          </p>
        </div>

        {/* Filters Card - Modern Design */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg mr-3">
              <FaFilter className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
              />
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === 'All' ? '' : cat}>
                  {cat}
                </option>
              ))}
            </select>
            
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="City or area"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
              />
            </div>
            
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white font-medium"
            >
              <option value="featured">⭐ Featured</option>
              <option value="rating">📊 Highest Rated</option>
              <option value="newest">🆕 Newest First</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaSearch className="text-blue-600 animate-pulse" />
              </div>
            </div>
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-xl mb-4">No businesses found</p>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 font-medium">
                Showing <span className="text-blue-600 font-bold">{businesses.length}</span> of{' '}
                <span className="text-blue-600 font-bold">{pagination.total}</span> businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {businesses.map((business) => (
                <Link
                  key={business._id}
                  to={`/business/${business._id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`h-48 bg-gradient-to-br ${categoryGradients[business.category] || 'from-gray-400 to-gray-600'} flex items-center justify-center text-white text-5xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <span className="relative z-10 transform group-hover:scale-110 transition-transform">
                      {categoryIcons[business.category] || '🏢'}
                    </span>
                    {business.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                        <FaStar className="mr-1" />
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {business.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {business.description}
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">{renderStars(business.rating)}</div>
                      <span className="text-sm font-semibold text-gray-900">
                        {business.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({business.reviewCount} reviews)
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{business.address.city}, {business.address.state}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <FaPhone className="mr-2 text-blue-600 flex-shrink-0" />
                        <span>{business.contact.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100">
                        {business.category}
                      </span>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <FaHeart className="text-lg" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 transition"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPagination({ ...pagination, page })}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      pagination.page === page
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessList;