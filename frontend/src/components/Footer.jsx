import { Link } from 'react-router-dom';
import { FaStore, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <FaStore className="text-2xl" />
              </div>
              <span className="text-2xl font-bold">LocalBiz</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting local businesses with customers since 2024.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-gray-400 hover:text-white transition">
                  Explore Businesses
                </Link>
              </li>
              <li>
                <Link to="/add-business" className="text-gray-400 hover:text-white transition">
                  Add Business
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/businesses?category=Restaurant" className="text-gray-400 hover:text-white transition">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/businesses?category=Salon & Spa" className="text-gray-400 hover:text-white transition">
                  Salons & Spas
                </Link>
              </li>
              <li>
                <Link to="/businesses?category=Gym & Fitness" className="text-gray-400 hover:text-white transition">
                  Gyms & Fitness
                </Link>
              </li>
              <li>
                <Link to="/businesses?category=Healthcare" className="text-gray-400 hover:text-white transition">
                  Healthcare
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 LocalBiz. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <FaHeart className="text-red-500 mx-1 animate-pulse" /> for local businesses
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;