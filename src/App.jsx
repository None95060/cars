import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false)
  const [currentView, setCurrentView] = useState('login') // 'login' or 'signup'

  const handleLogin = (email, password) => {
    // Simple demo login - in real app, validate credentials
    setIsAuthenticated(true)
  }

  const handleSignup = (email, password) => {
    // Simple demo signup - in real app, create account
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
      <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} onForgotPassword={() => setCurrentView('forgot')} />
    ) : (
      <Signup onSignup={handleSignup} onSwitchToLogin={() => setCurrentView('login')} />
    )
  }

  return (
    <div>
      <Dashboard onLogout={handleLogout} />
    </div>
  )
}

export default App
