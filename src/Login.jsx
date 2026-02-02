import { useState } from 'react';
import './Auth.css';

function Login({ onLogin, onSwitchToSignup, onForgotPassword, loginError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    onLogin(email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p style={{color: '#ff6f00', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
          {loginError && <p style={{color: '#ff6f00', textAlign: 'center', marginTop: '10px'}}>{loginError}</p>}
          <button type="submit" className="auth-btn">Log In</button>
        </form>
        <div style={{textAlign: 'center', marginTop: '10px'}}>
          <button onClick={onForgotPassword} className="auth-link" style={{background: 'none', border: 'none', cursor: 'pointer', marginBottom: '10px'}}>
            Forgot Password?
          </button>
        </div>
        <button onClick={onSwitchToSignup} className="auth-link" style={{background: 'none', border: 'none', cursor: 'pointer'}}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
