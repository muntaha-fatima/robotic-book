import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './styles.module.css';

const UserProfileContent = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState({});
  const [editingProfile, setEditingProfile] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const backendUrl = ExecutionEnvironment.canUseDOM
    ? (window as any).env?.REACT_APP_BACKEND_URL || 'http://localhost:8000'
    : 'http://localhost:8000';

  // Helper to get auth token
  const getAuthToken = () => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  };

  // Function to verify if the token is still valid
  const verifyToken = async () => {
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

  // Fetch user data and profile
  useEffect(() => {
    const fetchUserData = async () => {
      // Verify the token before making the request
      const isValid = await verifyToken();
      if (!isValid) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('authToken');
        }
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }

      const token = getAuthToken();
      if (!token) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login'; // Redirect to login if not authenticated
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log(`Attempting to connect to: ${backendUrl}/users/me`);

        // Fetch basic user info (username)
        const userResponse = await fetch(`${backendUrl}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('User response status:', userResponse.status);
        console.log('User response ok:', userResponse.ok);

        if (!userResponse.ok) {
          if (userResponse.status === 401 || userResponse.status === 403) {
            if (typeof localStorage !== 'undefined') {
              localStorage.removeItem('authToken');
            }
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return;
          }
          throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        console.log('User response data:', userData);

        setUsername(userData.username);

        // Note: The backend doesn't have a /profile endpoint, only uses the database
        // For now, we'll just display the user data we have
        setProfile(userData);
        setEditingProfile(userData); // Initialize editing state with current profile

      } catch (err) {
        console.error("Error fetching user data:", err);
        console.error("Full error details:", err);

        // Provide more specific error messages for network issues
        if (err instanceof TypeError && err.message.includes('fetch')) {
          setError(`Connection error: Unable to reach the server at ${backendUrl}. The server may not be running. Check the backend service.`);
        } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          setError(`Failed to connect to the server at ${backendUrl}. This could be due to CORS issues, network problems, or the server not running.`);
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [backendUrl]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Verify the token before making the request
      const isValid = await verifyToken();
      if (!isValid) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('authToken');
        }
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }

      const token = getAuthToken();
      // There is no /profile endpoint in the backend, so we can't save profile changes directly
      // The backend only supports username and password, and stores profile in a JSONB field
      alert("Profile update functionality is not yet implemented in the backend. The profile data is stored in the database but needs a specific endpoint to be updated.");

      // For now, just exit editing mode
      setIsEditing(false);

    } catch (err) {
      console.error("Error saving profile:", err);
      console.error("Full error details:", err);

      // Provide more specific error messages for network issues
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(`Connection error: Unable to reach the server at ${backendUrl}. The server may not be running. Check the backend service.`);
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError(`Failed to connect to the server at ${backendUrl}. This could be due to CORS issues, network problems, or the server not running.`);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingProfile(profile); // Reset editing state to current profile
    setIsEditing(false);
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
      <p>Error: {error}</p>
      <p style={{ fontSize: '0.85em', marginTop: '5px' }}>
        <strong>Troubleshooting:</strong> Make sure the backend server is running on {backendUrl}.
        If using Docker, ensure both frontend and backend services are started.
        Check browser console for more details.
      </p>
    </div>;
  }

  // This component assumes profile data is an object like { key: value, ... }
  // You might want to adjust how profile fields are displayed/edited based on actual data structure

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '50px auto' }}>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {username}</p>

      {!isEditing ? (
        <div>
          <h2>Profile Details</h2>
          {Object.keys(profile).length === 0 ? (
            <p>No profile details available yet.</p>
          ) : (
            Object.entries(profile).map(([key, value]) => {
              // Don't show sensitive information like password_hash
              if (key !== 'password_hash' && key !== 'id') {
                return <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}</p>;
              }
              return null;
            })
          )}
          <button onClick={handleEditClick} style={{ marginRight: '10px' }}>Edit Profile</button>
        </div>
      ) : (
        <div>
          <h2>Edit Profile</h2>
          <p>Profile editing functionality needs to be implemented in the backend.</p>
          <button onClick={handleSaveProfile} disabled={isLoading} style={{ marginRight: '10px' }}>Save Profile</button>
          <button onClick={handleCancelEdit} disabled={isLoading}>Cancel</button>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: '15px' }}>Error: {error}</div>}
    </div>
  );
};

const UserProfile = () => {
  return (
    <BrowserOnly>
      {() => <UserProfileContent />}
    </BrowserOnly>
  );
};

export default UserProfile;