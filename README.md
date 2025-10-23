# 🏪 Local Business Directory Platform

A full-stack web application that connects local businesses with customers through a modern, user-friendly directory and review platform.

## 🌟 Features

### For Customers
- 🔍 **Search & Discovery** - Find local businesses by category, location, and keywords
- ⭐ **Reviews & Ratings** - Read authentic reviews and ratings from real customers
- 📍 **Location-Based Search** - Filter businesses by city and neighborhood
- 📱 **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- 🎯 **Smart Filters** - Sort by rating, newest, or featured businesses

### For Business Owners
- 📝 **Business Listings** - Create and manage business profiles
- 💼 **Dashboard** - View and manage all your business listings
- 💬 **Review Management** - Respond to customer reviews
- 📊 **Business Hours** - Display operating hours for each day
- 📞 **Contact Information** - Showcase phone, email, and website
- 🏷️ **Categories** - Choose from multiple business categories

### Technical Features
- 🔐 **Secure Authentication** - JWT-based auth with encrypted passwords
- 🗄️ **RESTful API** - Clean, well-documented API endpoints
- 🎨 **Modern UI** - Built with React and Tailwind CSS
- 📦 **MongoDB Database** - Scalable NoSQL database
- 🚀 **Production Ready** - Easy deployment to cloud platforms

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
local-business-directory/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Business.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── business.js
│   │   └── review.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── BusinessList.jsx
│   │   │   ├── BusinessDetail.jsx
│   │   │   ├── AddBusiness.jsx
│   │   │   └── MyBusinesses.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
├── README.md
└── DEPLOYMENT_GUIDE.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/NoungaJoseph/Local-Business-Directory-Platform.git
cd local-business-directory
```

### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret

# Start backend
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Visit the App
Open your browser and go to `http://localhost:5173`

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/business-directory
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Business
- `GET /api/business` - Get all businesses (with filters)
- `GET /api/business/:id` - Get single business
- `POST /api/business` - Create business (protected, business owner only)
- `PUT /api/business/:id` - Update business (protected, owner only)
- `DELETE /api/business/:id` - Delete business (protected, owner only)
- `GET /api/business/my/listings` - Get current user's businesses (protected)

### Reviews
- `GET /api/review/business/:businessId` - Get all reviews for a business
- `POST /api/review` - Create review (protected)
- `PUT /api/review/:id` - Update review (protected, author only)
- `DELETE /api/review/:id` - Delete review (protected, author only)
- `POST /api/review/:id/response` - Business owner responds (protected)
- `POST /api/review/:id/helpful` - Mark review as helpful (protected)

## 🎨 Key Features Implementation

### Search & Filters
```javascript
// Multiple filter options
- Search by business name/description
- Filter by category
- Filter by city
- Sort by rating, featured, or newest
- Pagination support
```

### Review System
```javascript
// Comprehensive review features
- 1-5 star ratings
- Review title and comment
- Automatic rating calculation
- Business owner responses
- Helpful votes
- One review per user per business
```

### Authentication Flow
```javascript
// Secure user management
- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Role-based access (user, business_owner, admin)
- Token expiration (30 days)
```

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to:
- Vercel (Frontend)
- Railway/Render (Backend)
- MongoDB Atlas (Database)
- Custom domain setup

## 🔒 Security Features

- ✅ Password encryption (bcryptjs)
- ✅ JWT token authentication
- ✅ Input validation (express-validator)
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ SQL injection prevention (MongoDB)
- ✅ XSS protection (React)
- ✅ Rate limiting ready

## 🎯 Future Enhancements

- [ ] Google Maps integration for location display
- [ ] Image upload for business photos (Cloudinary)
- [ ] Email notifications for new reviews
- [ ] Advanced search with geolocation
- [ ] Business verification badges
- [ ] Featured/premium listings
- [ ] Social media integration
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and insights

## 📖 User Roles

### Customer (user)
- Browse businesses
- Search and filter
- Write reviews
- Mark reviews as helpful

### Business Owner (business_owner)
- All customer features
- Create business listings
- Manage own businesses
- Respond to reviews

### Admin (admin)
- All features
- Manage all businesses
- Delete any review
- Feature businesses

## 🐛 Known Issues

None at the moment! Report issues via GitHub Issues.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for amazing styling
- MongoDB for powerful database
- Express.js for robust backend framework

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Made with ❤️ for local businesses**
