import { useState } from 'react';
import './Auth.css'; // Reuse auth styles for modal

function ProfileModal({ onClose }) {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="auth-page" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000}}>
      <div className="auth-card" style={{maxWidth: '500px'}}>
        <h2 className="auth-title">Profile</h2>
        <p className="auth-subtitle">Update your profile information</p>
        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        {message && <p style={{color: '#00c853', textAlign: 'center', marginTop: '10px'}}>{message}</p>}
        <button onClick={handleSave} className="auth-btn" style={{marginTop: '10px'}}>Save Changes</button>
        <button onClick={onClose} className="auth-link" style={{background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px'}}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
