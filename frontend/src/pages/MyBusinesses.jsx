import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { businessAPI } from '../services/api';
import { FaStar, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

const MyBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBusinesses();
  }, []);

  const fetchMyBusinesses = async () => {
    try {
      const { data } = await businessAPI.getMyListings();
      setBusinesses(data.businesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      try {
        await businessAPI.delete(id);
        setBusinesses(businesses.filter(b => b._id !== id));
      } catch (error) {
        alert('Failed to delete business');
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Businesses</h1>
          <Link
            to="/add-business"
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <FaPlus />
            <span>Add New Business</span>
          </Link>
        </div>

        {businesses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">You haven't added any businesses yet.</p>
            <Link
              to="/add-business"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Your First Business
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div key={business._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl">
                  {business.category === 'Restaurant' && '🍽️'}
                  {business.category === 'Salon & Spa' && '💇'}
                  {business.category === 'Gym & Fitness' && '💪'}
                  {business.category === 'Auto Services' && '🚗'}
                  {business.category === 'Healthcare' && '🏥'}
                  {business.category === 'Retail' && '🛍️'}
                  {!['Restaurant', 'Salon & Spa', 'Gym & Fitness', 'Auto Services', 'Healthcare', 'Retail'].includes(business.category) && '🏢'}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {business.name}
                    </h3>
                    {business.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {business.description}
                  </p>

                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">{renderStars(business.rating)}</div>
                    <span className="text-sm text-gray-600">
                      ({business.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {business.category}
                    </span>
                    <span className={`ml-2 inline-block text-xs px-2 py-1 rounded ${
                      business.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {business.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/business/${business._id}`}
                      className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition text-sm"
                    >
                      <FaEye />
                      <span>View</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(business._id)}
                      className="flex items-center justify-center space-x-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition text-sm"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBusinesses;