import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()
  const cartCount = getCartItemCount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className=" mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to='/' onClick={() => setMobileMenuOpen(false)}>
              <p className="text-lg sm:text-xl md:text-xl text-blue-500 font-semibold">MithaiMart</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 border px-4 lg:px-6 py-2 font-semibold border-blue-300 rounded-lg">
            <Link to="/" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500 text-sm lg:text-base">Home</Link>
            <Link to="/dashboard" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500 text-sm lg:text-base">Menu</Link>
            <a href="#" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500 text-sm lg:text-base">About</a>
            <a href="#" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500 text-sm lg:text-base">Contact</a>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user && (
              <Link
                to="/dashboard"
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
                title="View Cart"
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <>
                <span className="text-gray-700 text-sm lg:text-base hidden lg:inline">Welcome, {user.name?.split(' ')[0]}!</span>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-gray-700 border border-blue-400 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
            >
              Menu
            </Link>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
              About
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
              Contact
            </a>
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            )}
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-500">Welcome, {user.name?.split(' ')[0]}!</div>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 border border-blue-400 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}


