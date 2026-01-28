import { useState } from 'react'
import './App.css'
import SignUp from './SignUp'
import Login from './Login'

function App() {
  const [currentPage, setCurrentPage] = useState('signup')

  return (
    <div>
      {currentPage === 'signup' ? (
        <SignUp onSwitchToLogin={() => setCurrentPage('login')} />
      ) : (
        <Login onSwitchToSignUp={() => setCurrentPage('signup')} />
      )}
    </div>
  )
}

export default App
