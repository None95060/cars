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

  const handleLogin = (email, password) => {
    // Check if user exists with matching credentials
    const userExists = users.find(user => user.email === email && user.password === password)
    
    if (!userExists) {
      setLoginError('Invalid email or password')
      return
    }
    
    setLoginError('')
    setIsAuthenticated(true)
  }

  const handleSignup = (name, email, password) => {
    // Check if email already exists
    const emailExists = users.find(user => user.email === email)
    
    if (emailExists) {
      setLoginError('Email already registered')
      return
    }
    
    // Add new user to users list
    setUsers([...users, { name, email, password }])
    setLoginError('')
    setIsAuthenticated(true)
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
