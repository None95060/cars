import { useState } from 'react'
import './App.css'
import SignUp from './SignUp'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('signup')

  const goToDashboard = () => setCurrentPage('dashboard')

  return (
    <div>
      {currentPage === 'signup' ? (
        <SignUp onSwitchToLogin={() => setCurrentPage('login')} onSignUpSuccess={goToDashboard} />
      ) : currentPage === 'login' ? (
        <Login onSwitchToSignUp={() => setCurrentPage('signup')} onLoginSuccess={goToDashboard} />
      ) : (
        <Dashboard onLogout={() => setCurrentPage('login')} />
      )}
    </div>
  )
}

export default App
