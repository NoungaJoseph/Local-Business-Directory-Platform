import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaStore, FaPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout, isBusinessOwner } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaStore className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-gray-900">LocalBiz</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/businesses"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Explore
            </Link>

            {isAuthenticated ? (
              <>
                {isBusinessOwner && (
                  <>
                    <Link
                      to="/add-business"
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
                    >
                      <FaPlus />
                      <span>Add Business</span>
                    </Link>
                    <Link
                      to="/my-businesses"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      My Businesses
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;