import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BusinessList from './pages/BusinessList';
import BusinessDetail from './pages/BusinessDetail';
import AddBusiness from './pages/AddBusiness';
import MyBusinesses from './pages/MyBusinesses';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/businesses" element={<BusinessList />} />
              <Route path="/business/:id" element={<BusinessDetail />} />
              <Route
                path="/add-business"
                element={
                  <PrivateRoute>
                    <AddBusiness />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-businesses"
                element={
                  <PrivateRoute>
                    <MyBusinesses />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;