import { useState } from 'react'
import './Sidebar.css'

function Sidebar({ onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (page) => {
    onNavigate(page)
    setIsOpen(false)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>🚗 Showroom</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <button 
            className="nav-btn"
            onClick={() => handleNavigation('home')}
          >
            🏠 Home
          </button>
          <button 
            className="nav-btn"
            onClick={() => handleNavigation('profile')}
          >
            👤 Profile
          </button>
          <button 
            className="nav-btn"
            onClick={() => handleNavigation('favorites')}
          >
            ❤️ Favorites
          </button>
          <button 
            className="nav-btn logout-btn"
            onClick={onLogout}
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  )
}

export default Sidebar
