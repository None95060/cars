import { useState } from 'react';
import './Auth.css';

function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    // Simple demo - in real app, send reset email
    setMessage('Password reset link sent to your email!');
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="resetEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              required
            />
          </div>
          {error && <p style={{color: '#ff6f00', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
          {message && <p style={{color: '#00c853', textAlign: 'center', marginTop: '10px'}}>{message}</p>}
          <button type="submit" className="auth-btn">Send Reset Link</button>
        </form>
        <button onClick={onBackToLogin} className="auth-link" style={{background: 'none', border: 'none', cursor: 'pointer'}}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
