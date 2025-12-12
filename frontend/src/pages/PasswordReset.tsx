import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './auth-styles.module.css';

const PasswordResetContent = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('request'); // 'request', 'verify', 'reset'
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Use environment variable or fallback to localhost
  const backendUrl = ExecutionEnvironment.canUseDOM
    ? (window as any).env?.REACT_APP_BACKEND_URL || 'http://localhost:8000'
    : 'http://localhost:8000';

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Attempting to connect to: ${backendUrl}/request-password-reset`);

      const response = await fetch(`${backendUrl}/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response data:', errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Password reset response data:', data);

      setSuccessMessage("Password reset link sent to your email.");
      setStep('verify'); // Move to verification step

    } catch (err) {
      console.error('Password reset request error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      setError("Please enter the verification code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Attempting to connect to: ${backendUrl}/verify-reset-code`);

      const response = await fetch(`${backendUrl}/verify-reset-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          code: verificationCode
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response data:', errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Verification response data:', data);

      setSuccessMessage("Verification successful. You can now reset your password.");
      setStep('reset'); // Move to reset step

    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Attempting to connect to: ${backendUrl}/reset-password`);

      const response = await fetch(`${backendUrl}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          code: verificationCode,
          new_password: newPassword
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response data:', errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Password reset response data:', data);

      setSuccessMessage("Password has been reset successfully. Redirecting to login...");

      // Redirect to login after a short delay
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }

    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Reset Password</h2>
          <p>Enter your email to reset your password</p>
        </div>

        <div className={styles.authForm}>
          {step === 'request' && (
            <form onSubmit={handleRequestReset}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <button type="submit" disabled={isLoading} className={styles.authButton}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              {successMessage && (
                <div className={styles.successMessage}>
                  {successMessage}
                </div>
              )}

              <div className={styles.authLinks}>
                <span><a href="/login">Back to Login</a></span>
              </div>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerifyCode}>
              <div className={styles.formGroup}>
                <label htmlFor="verificationCode">Verification Code</label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter the code sent to your email"
                  required
                />
              </div>

              <button type="submit" disabled={isLoading} className={styles.authButton}>
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              {successMessage && (
                <div className={styles.successMessage}>
                  {successMessage}
                </div>
              )}

              <div className={styles.authLinks}>
                <span><a href="/login">Back to Login</a> | <a href="#" onClick={(e) => { e.preventDefault(); setStep('request'); }}>Resend Code</a></span>
              </div>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetPassword}>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                />
              </div>

              <button type="submit" disabled={isLoading} className={styles.authButton}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              {successMessage && (
                <div className={styles.successMessage}>
                  {successMessage}
                </div>
              )}

              <div className={styles.authLinks}>
                <span><a href="/login">Back to Login</a></span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const PasswordReset = () => {
  return (
    <BrowserOnly>
      {() => <PasswordResetContent />}
    </BrowserOnly>
  );
};

export default PasswordReset;