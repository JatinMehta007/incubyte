import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative  bg-gradient-to-br bg-white">
          <Navbar />
          <div className="bg-blue-200 text-center">
            BLACK FRIDAY MEGA SALE
            LIMITED TIME — 40% OFF
            </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


