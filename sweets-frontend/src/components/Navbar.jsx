import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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
        <button onClick={() => setView('grid')} className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500">Home</button>
        <button onClick={() => setView('tile')} className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500">Menu</button>
        <a href="#" className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500">About</a>
        <button className="hover:bg-blue-200 hover:rounded-md hover:px-2 duration-500" onClick={() => setOpen(true)}>Contact</button>
      </div>
          <div className="flex items-center space-x-4">
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


