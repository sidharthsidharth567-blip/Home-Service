import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const loginStyles = String.raw`
:root {
  --primary: #e23744;
  --primary-dark: #c42b38;
  --primary-light: #fceeed;
  --bg-white: #ffffff;
  --text-dark: #1c1c1c;
  --text-gray: #64748b;
  --border-color: #e2e8f0;
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);
  --radius-lg: 16px;
}

.auth-page-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 20px;
  position: relative;
}

.auth-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: var(--text-gray);
  z-index: 10;
}

.auth-close-btn:hover {
  background: #f8fafc;
  color: var(--text-dark);
}

.auth-split-layout {
  display: flex;
  max-width: 1000px;
  width: 100%;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.auth-brand-section {
  flex: 1;
  background: linear-gradient(135deg, var(--primary) 0%, #ff6b6b 100%);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.auth-brand-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
}

.auth-brand-content {
  position: relative;
  z-index: 1;
}

.auth-brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: var(--primary);
}

.auth-brand-logo span {
  font-size: 24px;
  font-weight: 700;
}

.auth-brand-section h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.auth-brand-section p {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 32px;
}

.auth-brand-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
}

.feature-check {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.auth-form-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.auth-mode-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  background: #f8fafc;
  padding: 6px;
  border-radius: 12px;
}

.mode-tab {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-gray);
  cursor: pointer;
  transition: all 0.2s;
}

.mode-tab.active {
  background: white;
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(226, 55, 68, 0.12);
}

.auth-form-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.auth-form-header {
  margin-bottom: 24px;
}

.auth-form-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.auth-form-header p {
  color: var(--text-gray);
  font-size: 14px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
}

.input-group input,
.input-group select {
  padding: 14px 16px;
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s;
  background: #f8fafc;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
}

.password-input-wrapper {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  background: #f8fafc;
  overflow: hidden;
}

.password-input-wrapper:focus-within {
  border-color: var(--primary);
  background: white;
}

.password-input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px;
}

.password-toggle {
  padding: 14px;
  background: transparent;
  border: none;
  color: var(--text-gray);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  padding: 16px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-primary:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.auth-divider span {
  font-size: 13px;
  color: var(--text-gray);
  white-space: nowrap;
}

.social-login-btns {
  display: flex;
  gap: 12px;
}

.btn-social {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-social:hover {
  background: #f8fafc;
  border-color: var(--text-gray);
}

.auth-switch-text {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: var(--text-gray);
}

.auth-switch-text a {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.auth-switch-text a:hover {
  text-decoration: underline;
}

.user-type-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.user-type-card {
  padding: 20px 12px;
  border: 1.5px solid var(--border-color);
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.user-type-card:hover {
  border-color: var(--primary);
}

.user-type-card.active {
  border-color: var(--primary);
  background: var(--primary-light);
}

.type-icon {
  font-size: 28px;
}

.user-type-card span {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.terms-checkbox {
  margin: 8px 0;
}

.terms-checkbox label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

.terms-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--primary);
}

.terms-checkbox span {
  font-size: 13px;
  color: var(--text-gray);
  line-height: 1.5;
}

.terms-checkbox a {
  color: var(--primary);
  text-decoration: none;
}

.terms-checkbox a:hover {
  text-decoration: underline;
}

.auth-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 40px;
}

.success-icon {
  color: #22c55e;
  margin-bottom: 24px;
}

.auth-success h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.auth-success p {
  color: var(--text-gray);
  font-size: 15px;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .auth-split-layout {
    flex-direction: column;
  }

  .auth-brand-section {
    padding: 32px 24px;
  }

  .auth-brand-section h1 {
    font-size: 24px;
  }

  .auth-form-section {
    padding: 24px;
  }

  .user-type-cards {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
`;

const DEMO_ACCOUNTS = [
  {
    role: 'admin',
    name: 'Admin',
    email: 'admin@homecare.com',
    phone: '9999999999',
    password: 'admin123',
  },
  {
    role: 'provider',
    name: 'Provider',
    email: 'provider@homecare.com',
    phone: '8888888888',
    password: 'provider123',
  },
  {
    role: 'customer',
    name: 'Customer',
    email: 'customer@homecare.com',
    phone: '7777777777',
    password: 'customer123',
  },
];

function Login({ onLoginSuccess, onClose }) {
  const [authStep, setAuthStep] = useState('entry');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const triggerSuccess = (name, type) => {
    setAuthStep('success');
    setTimeout(() => {
      onLoginSuccess(name, type);
    }, 1200);
  };

  const getDisplayName = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return 'Customer';
    if (trimmedValue.includes('@')) {
      return trimmedValue.split('@')[0] || 'Customer';
    }
    return trimmedValue;
  };

  const normalizePhone = (value) => value.replace(/\D/g, '').slice(-10);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginIdentifier.trim() && password) {
      setAuthError('');
      const normalizedIdentifier = loginIdentifier.trim().toLowerCase();
      const normalizedPhone = normalizePhone(loginIdentifier);
      const matchedAccount = DEMO_ACCOUNTS.find((account) => (
        account.email === normalizedIdentifier ||
        account.phone === normalizedPhone
      ));

      if (matchedAccount) {
        if (matchedAccount.password === password) {
          triggerSuccess(matchedAccount.name, matchedAccount.role);
          return;
        }

        setAuthError('Invalid password for this demo account.');
        return;
      }

      triggerSuccess(getDisplayName(loginIdentifier), 'customer');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    triggerSuccess(getDisplayName(email || phone), 'customer');
  };

  return (
    <div className="auth-page-container">
      <style>{loginStyles}</style>
      <button className="auth-close-btn" onClick={onClose} type="button" aria-label="Close">
        <span>&times;</span>
      </button>

      <div className="auth-split-layout">
        <div className="auth-brand-section">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <div className="logo-icon">H</div>
              <span>HomeCare</span>
            </div>
            <h1>Your Trusted Home Service Partner</h1>
            <p>Book verified professionals for all your home service needs. Fast, reliable, and affordable.</p>
            <div className="auth-brand-features">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Verified Professionals</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>24/7 Support</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-section">

          {/* ✅ auth-mode-tabs (Login tab button) remove ചെയ്തു */}

          {authStep === 'entry' && (
            <div className="auth-form-card animate-fade-in">
              <div className="auth-form-header">
                <h2>Welcome Back</h2>
                <p>Sign in with your phone number or email address and password</p>
              </div>

              <form onSubmit={handleLogin} className="auth-form">
                <div className="input-group">
                  <label>Phone Number or Email</label>
                  <input
                    type="text"
                    placeholder="Enter phone number or email"
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      setAuthError('');
                    }}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setAuthError('');
                      }}
                      required
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  Sign In
                </button>
                {authError && (
                  <p style={{ margin: '-8px 0 0', fontSize: '13px', color: '#dc2626', fontWeight: 600 }}>
                    {authError}
                  </p>
                )}
              </form>

              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="social-login-btns">
                <button type="button" className="btn-social google">
                  <svg viewBox="0 0 48 48" width="20" height="20"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                  Google
                </button>
                <button type="button" className="btn-social apple">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  Apple
                </button>
              </div>

              <p className="auth-switch-text">
                Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthStep('signup'); }}>Sign up</a>
              </p>
            </div>
          )}

          {authStep === 'signup' && (
            <div className="auth-form-card animate-fade-in">
              <div className="auth-form-header">
                <h2>Create Account</h2>
                <p>Join HomeCare today</p>
              </div>

              <form onSubmit={handleRegister} className="auth-form">
                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="terms-checkbox">
                  <label>
                    <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                    <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                  </label>
                </div>
                <button type="submit" className="btn-primary" disabled={!agreeTerms}>
                  Create Account
                </button>
              </form>

              <p className="auth-switch-text">
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthStep('entry'); }}>Sign in</a>
              </p>
            </div>
          )}

          {authStep === 'success' && (
            <div className="auth-success animate-fade-in">
              <div className="success-icon">
                <CheckCircle2 size={80} />
              </div>
              <h2>Success!</h2>
              <p>You&apos;ve successfully authenticated. Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
