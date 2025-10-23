import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaShieldAlt, FaRocket, FaArrowRight, FaChartLine } from 'react-icons/fa';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (city) params.append('city', city);
    navigate(`/businesses?${params.toString()}`);
  };

  const categories = [
    { name: 'Restaurant', icon: '🍽️', gradient: 'from-orange-400 to-red-500' },
    { name: 'Salon & Spa', icon: '💇', gradient: 'from-pink-400 to-purple-500' },
    { name: 'Gym & Fitness', icon: '💪', gradient: 'from-green-400 to-teal-500' },
    { name: 'Auto Services', icon: '🚗', gradient: 'from-blue-400 to-indigo-500' },
    { name: 'Healthcare', icon: '🏥', gradient: 'from-red-400 to-pink-500' },
    { name: 'Retail', icon: '🛍️', gradient: 'from-purple-400 to-indigo-500' },
  ];

  const stats = [
    { value: '10,000+', label: 'Local Businesses' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '25,000+', label: 'Reviews Posted' },
    { value: '4.8/5', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Modern Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
              <FaChartLine className="mr-2" />
              <span>Trusted by 10,000+ Local Businesses</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Local Businesses
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Connect with the best local services in your neighborhood. Read authentic reviews, explore ratings, and make informed decisions.
            </p>

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3 backdrop-blur-lg">
                <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaSearch className="text-gray-400 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="Search restaurants, salons, gyms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 outline-none text-gray-900 bg-transparent placeholder-gray-500"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaMapMarkerAlt className="text-gray-400 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="Enter city or neighborhood"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 outline-none text-gray-900 bg-transparent placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  Search
                  <FaArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm md:text-base font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for with our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/businesses?category=${cat.name}`)}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative p-8 text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <div className="text-gray-900 group-hover:text-white font-semibold transition-colors duration-300">
                  {cat.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Section - Modern Cards */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose LocalBiz?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to discover and connect with trusted local businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-10 text-center transition-all duration-300 transform hover:-translate-y-3 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6 transform group-hover:rotate-6 transition-transform">
                <FaStar className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Verified Reviews
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Read authentic reviews from real customers to make the best decisions for your needs
              </p>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-10 text-center transition-all duration-300 transform hover:-translate-y-3 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 transform group-hover:rotate-6 transition-transform">
                <FaShieldAlt className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Trusted Businesses
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All businesses are verified and monitored to ensure quality and reliability
              </p>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-10 text-center transition-all duration-300 transform hover:-translate-y-3 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-6 transform group-hover:rotate-6 transition-transform">
                <FaRocket className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Lightning Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find what you need quickly with our powerful search and intuitive filters
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Modern Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of local businesses reaching new customers every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Get Started Free
              <FaArrowRight />
            </button>
            <button
              onClick={() => navigate('/businesses')}
              className="bg-blue-500/20 backdrop-blur-sm text-white border-2 border-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-500/30 transition transform hover:scale-105"
            >
              Explore Businesses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;