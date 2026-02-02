import { useState } from 'react'
import React from 'react'
import './App.css'
import Dashboard from './Dashboard'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false)
  const [currentView, setCurrentView] = useState('login') // 'login' or 'signup'
  const [users, setUsers] = useLocalStorage('users', [])
  const [loginError, setLoginError] = useState('')

  // Auto-reset corrupted auth state on load
  React.useEffect(() => {
    if (isAuthenticated === true && (!users || users.length === 0)) {
      setIsAuthenticated(false)
      setCurrentView('login')
    }
  }, [])

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setLoginError(data.error || 'Login failed')
        return
      }
      
      setLoginError('')
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Unable to connect to server. Make sure the server is running on port 5000.')
    }
  }

  const handleSignup = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setLoginError(data.error || 'Signup failed')
        return
      }
      
      setLoginError('')
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Signup error:', error)
      setLoginError('Unable to connect to server. Make sure the server is running on port 5000.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('login')
  }

  if (!isAuthenticated) {
    if (currentView === 'forgot') {
      return <ForgotPassword onBackToLogin={() => setCurrentView('login')} />
    }
    return currentView === 'login' ? (
      <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} onForgotPassword={() => setCurrentView('forgot')} loginError={loginError} />
    ) : (
      <Signup onSignup={handleSignup} onSwitchToLogin={() => setCurrentView('login')} signupError={loginError} />
    )
  }

  return (
    <div>
      <Dashboard onLogout={handleLogout} />
    </div>
  )
}

export default App
