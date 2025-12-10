import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

// Function to get the JWT token from local storage
const getAuthToken = () => {
  return localStorage.getItem('authToken') || '';
};

// Function to verify if the token is still valid by making a request to /users/me
const verifyToken = async (backendUrl: string) => {
  try {
    const token = getAuthToken();
    if (!token) return false;

    const response = await fetch(`${backendUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};

const RAGChatbot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([
    { text: "Hello! I'm your RAG Chatbot for robotics. You can ask me questions about robotics, AI, and related topics. Sign up and log in to get full access to the chatbot!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Docusaurus makes environment variables available at build time
  // Use window.env or a global config if available, otherwise fallback
  const backendUrl =
    (typeof window !== 'undefined' && (window as any).env?.REACT_APP_BACKEND_URL) ||
    'http://localhost:8000';

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getAuthToken();
      if (token) {
        const isValid = await verifyToken(backendUrl);
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthStatus();
  }, [backendUrl]);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    if (!isAuthenticated) {
      // If not authenticated, show a message and guide to login
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, {
          text: "Please sign up and log in to use the full chatbot functionality!",
          sender: 'bot'
        }]);
      }, 500); // Delay to show the user message first
      // Optionally redirect to signup instead of just showing the message
      setTimeout(() => {
        window.location.href = '/signup';
      }, 3000); // Redirect after 3 seconds
      return;
    }

    try {
      // Verify token before making the request
      const isValid = await verifyToken(backendUrl);
      if (!isValid) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        window.location.href = '/login';
        return;
      }

      const token = getAuthToken(); // Ensure we have the latest token
      console.log(`Attempting to connect to: ${backendUrl}/chat`);

      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Bearer token authentication
        },
        body: JSON.stringify({ query: input }),
      });

      console.log('Query response status:', response.status);
      console.log('Query response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Query error response data:', errorData);
        if (response.status === 401 || response.status === 403) {
          // Token might be expired or invalid
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          window.location.href = '/login';
          return;
        }
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Query response data:', data);

      const botMessage = { text: data.response, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (err) {
      console.error("Error sending message:", err);
      console.error("Full error details:", err);

      // Provide more specific error messages for network issues
      if (err instanceof TypeError && err.message.includes('fetch')) {
        const errorMessage = `Connection error: Unable to reach the server at ${backendUrl}. The server may not be running. Check the backend service.`;
        setError(errorMessage);
        // Display error message to user
        setMessages(prevMessages => [...prevMessages, { text: `Error: ${errorMessage}`, sender: 'error' }]);
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        const errorMessage = `Failed to connect to the server at ${backendUrl}. This could be due to CORS issues, network problems, or the server not running.`;
        setError(errorMessage);
        // Display error message to user
        setMessages(prevMessages => [...prevMessages, { text: `Error: ${errorMessage}`, sender: 'error' }]);
      } else {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        // Display error message to user
        setMessages(prevMessages => [...prevMessages, { text: `Error: ${errorMessage}`, sender: 'error' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.header}>
        <h2>🤖 Robotics Assistant</h2>
        <div className={styles.authButtons}>
          {isAuthenticated ? (
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          ) : (
            <>
              <button onClick={() => window.location.href = '/signup'} className={styles.signupButton}>Sign Up</button>
              <button onClick={() => window.location.href = '/login'} className={styles.loginButton}>Login</button>
            </>
          )}
        </div>
      </div>
      <div ref={messageListRef} className={styles.messageList}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.bot}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Thinking</span>
              <span style={{ display: 'flex' }}>
                <span style={{ animation: 'pulse 1.4s infinite' }}>.</span>
                <span style={{ animation: 'pulse 1.4s infinite 0.2s' }}>.</span>
                <span style={{ animation: 'pulse 1.4s infinite 0.4s' }}>.</span>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something about robotics, AI, or humanoid tech..."
          disabled={isLoading}
          aria-label="Type your message"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default RAGChatbot;
