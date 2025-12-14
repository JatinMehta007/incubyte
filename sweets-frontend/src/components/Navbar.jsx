import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()
  const cartCount = getCartItemCount()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg flex justify-between items-center p-[20px]">
        <div className="flex itesm-center">
       <Link to='/'>
       <p className="flex justify-center text-xl items-center text-blue-500 font-semibold">MithaiMart</p>
       </Link>
      </div>
      <div className="flex hover:scale-110 duration-500 gap-4 border px-6 py-2 font-semibold border-blue-300">
        <Link to="/" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500">Home</Link>
        <Link to="/dashboard" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500">Menu</Link>
        <a href="#" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500">About</a>
        <a href="#" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500">Contact</a>
      </div>
          <div className="flex items-center space-x-4">
            {user && (
              <Link
                to="/dashboard"
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
                title="View Cart"
              >
                <svg
                  className="w-6 h-6"
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
                <span className="text-gray-700">Welcome, {user.name}!</span>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        
      
    </nav>
  )
}


