import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen relative bg-gradient-to-br bg-white">
            <Navbar />
            <div className="bg-blue-200 text-center py-2 sm:py-3 px-2 sm:px-4">
              <p className="text-xs sm:text-sm md:text-base font-semibold">
                BLACK FRIDAY MEGA SALE | LIMITED TIME — 40% OFF
              </p>
            </div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App


