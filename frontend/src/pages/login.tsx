import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './auth-styles.module.css';

const LoginPageContent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use environment variable or fallback to localhost
  const backendUrl = ExecutionEnvironment.canUseDOM
    ? (window as any).env?.REACT_APP_BACKEND_URL || 'http://localhost:8001'
    : 'http://localhost:8001';

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        window.location.href = '/'; // Redirect to homepage if already logged in
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!username.trim() || !password.trim()) {
      setError("Username and password cannot be empty.");
      return;
    }

    // Check password length (byte-level check for bcrypt limit)
    const passwordBytes = new TextEncoder().encode(password);
    if (passwordBytes.length > 72) {
      setError("Password cannot exceed 72 bytes due to bcrypt limitations.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Attempting to connect to: ${backendUrl}/login`);

      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response data:', errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login response data:', data);

      // Store the token in localStorage if it exists in the response
      if (data.access_token || data.token) {
        const token = data.access_token || data.token;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('authToken', token);
        }
        // Redirect to the main page after successful login
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      } else {
        throw new Error('Login failed: No token received.');
      }

    } catch (err) {
      console.error('Login error:', err);
      console.error('Full error details:', err);

      // Provide more specific error messages for network issues
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(`Connection error: Unable to reach the server at ${backendUrl}. The server may not be running. Check the backend service.`);
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError(`Failed to connect to the server at ${backendUrl}. This could be due to CORS issues, network problems, or the server not running.`);
      } else {
        setError(err.message || 'An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleLogin} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                style={{ marginRight: '8px' }}
              />
              Remember me
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading} className={styles.authButton}>
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.authLinks}>
            <span>Don't have an account? <a href="/signup">Sign Up</a></span>
          </div>

          <div className={styles.divider}>OR</div>

          <div className={styles.socialLogin}>
            <button type="button" className={styles.socialButton}>
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODAgNTEyIj48cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNMzQ1LjMgMi44QzM3OS45LTEuMSA0MTYuNS0uOSA0NDcuNyA0LjRjLTQuOS0yLjktMTEuNi00LjctMTguNC00LjctMzMuOCAwLTY1LjUgMTkuNS04NC4yIDQ5LjRjLTcuNC0xLjQtMTQuOS0yLjEtMjIuNS0yLjEtMzAuOSAwLTU3LjkgMTIuNS03Ny4xIDMxLjdjLTE5LjItMTkuMi00Ni4yLTMxLjctNzcuMS0zMS43Yy0xOC4zIDAtMzUuNyAzLjUtNTEuOSA5LjZjLTE3LjYtNi4xLTM3LjMtOS42LTU3LjktOS42QzEwLjMgMCAwIDEwLjMgMCAyMi43VjI4OWMwIDIwLjEgMTIuNiAzNy45IDMwLjUgNDYuNmMxLjgtLjQgMy42LS43IDUuNC0xLjFjMjMuMi01LjcgNDguNC04LjggNzQuMy04LjhjMjUuOSAwIDUxLjEgMy4xIDc0LjMgOC44YzEuOCAuNCAzLjYuNyA1LjQgMS4xYzE3LjktOC43IDMwLjUtMjYuNSAzMC41LTQ2LjZWMjIuN2MwLTQuNyAxLjctOS4yIDQuOC0xMi43YzMuMS0zLjUgNy40LTUuOCAxMi4xLTYuN2MzLjYtLjcgNy4zLS45IDEwLjktLjlzNy4zLjIgMTAuOS45YzQuNS45IDguOCAzLjIgMTIuMSA2LjdjMy4xIDMuNSA0LjggOC4xIDQuOCAxMi43VjI4OWMwIDEwLjIgMy43IDE5LjYgMTAuNSAyNi45YzM2LjUtMy45IDcyLjYtMy45IDEwOS4xIDBjNi44LTcuMyAxMC41LTE2LjcgMTAuNS0yNi45VjIyLjdjMC00LjcgMS43LTkuMiA0LjgtMTIuN2MzLjEtMy41IDcuNC01LjggMTIuMS02LjdjMy42LS43IDcuMy0uOSAxMC45LS45czcuMy4yIDEwLjkuOWMyLjIuNSA0LjMgMS4zIDYuMiAyLjNjLTIuMi0uMy00LjUtLjUtNi44LS41SDM0NS5zem0tMjQuNyA0MDQuNGMtMzkuNyAyLjEtODEuNy0xMC41LTExNC0zNC40Yy0xLjctLjctMy41LTEuNC01LjItMi4yYy0xOS4zIDguNS0zOS45IDEzLjEtNjAuOCAxMy4xcy00MS41LTQuNi02MC44LTEzLjFjLTEuNy44LTMuNSAxLjUtNS4yIDIuMmMtMzIuMyAyMy45LTc0LjMgMzYuNS0xMTQtMzQuNGM0LjUgMS4yIDguOSAxLjkgMTMuMyAyLjJjMzUuNSAxLjkgNzEuOS0yLjcgMTA0LjYtMTIuOGMxLjcuMyAzLjQuNyA1IDEuMWMyMC41IDQuOSA0MS44IDcuNCA2My4xIDcuNHM0Mi42LTIuNSA2My4xLTcuNGMxLjctLjQgMy40LS44IDUuMS0xLjFjMzIuNyAxMC4xIDY5LjEgMTQuNyAxMDQuNiAxMi44YzQuNC0uMyA4LjgtMSAxMy4zLTIuMnoiLz48L3N2Zz4=" alt="Google" />
              Sign in with Google
            </button>
            <button type="button" className={styles.socialButton}>
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSIjMTg3N0YyIiBkPSJNOTQuOCAzMjUuMkwzNy42IDIyLjZDNDEuNyA4LjIgNTQuNyAwIDcwIDBMNDM2LjggMEM0NTIuMSAwIDQ2NS4xIDguMiA0NjkuMiAyMi42TDQxMi4xIDMyNS4yQzQwNy45IDMzOS42IDM5NC45IDM0Ny44IDM3OS42IDM0Ny44TDEwNS40IDM0Ny44QzkwLjEgMzQ3LjggNzcuMSAzMzkuNiA3Mi45IDMyNS4yeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMjQgMjQwYzQ4LjYgMCA4OC0zOS40IDg4LTg4cy0zOS40LTg4LTg4LTg4cy04OCAzOS40LTg4IDg4QzEzNiAyMDEuNCAxNzUuNCAyNDAgMjI0IDI0MHptMTA0IDg4SDExMmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2MTI4YzAgOC44IDQuNiAxNi43IDEyIDE4YzEuMi4yIDIuNS4zIDMuOC4zYzE0LjIgMCAyNS43LTExLjYgMjUuNy0yNS43YzAtLjgtLjEtMS42LS4zLTIuNGMxMy4xLTIuNiAyMi4zLTE0LjIgMjIuMy0yNy40VjM2MGMwLTI2LjUgMjEuNS00OCA0OC00OGgxMjhjMjYuNSAwIDQ4IDIxLjUgNDggNDh2NjRjMCAyNi41LTIxLjUgNDgtNDggNDhoLTE2djMyaDE2YzQ0LjEgMCA4MC0zNS45IDgwLTgwVjMyOGMwLTI2LjUtMjEuNS00OC00OC00OHoiLz48L3N2Zz4=" alt="Facebook" />
              Sign in with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <BrowserOnly>
      {() => <LoginPageContent />}
    </BrowserOnly>
  );
};

export default Login;