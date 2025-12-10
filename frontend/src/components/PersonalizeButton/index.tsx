import React, { useState } from 'react';

interface PersonalizeButtonProps {
  contentToPersonalize?: string; // Optional content to personalize, otherwise uses page content
  onPersonalizeComplete?: (personalizedContent: string) => void; // Callback when personalization is complete
}

const PersonalizeButton: React.FC<PersonalizeButtonProps> = ({ contentToPersonalize, onPersonalizeComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use Docusaurus environment variables or fallback to default
  const backendUrl =
    (typeof window !== 'undefined' && (window as any).env?.REACT_APP_BACKEND_URL) ||
    'http://localhost:8000';

  // Function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem('authToken') || '';
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

  const handlePersonalize = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Verify the token before making the request
      const isValid = await verifyToken();
      if (!isValid) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
      }

      const token = getAuthToken();
      if (!token) {
        throw new Error('Not authenticated. Please log in first.');
      }

      // Use provided content or default to current page content
      const content = contentToPersonalize || document.body.innerText || 'Default content to personalize';

      console.log(`Attempting to connect to: ${backendUrl}/personalize`);

      const response = await fetch(`${backendUrl}/personalize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: content }),
      });

      console.log('Personalize response status:', response.status);
      console.log('Personalize response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Personalize error response data:', errorData);
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          return;
        }
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Personalize response data:', data);

      if (onPersonalizeComplete) {
        onPersonalizeComplete(data.personalized_text);
      }
    } catch (err) {
      console.error('Personalization error:', err);
      console.error('Full error details:', err);

      // Provide more specific error messages for network issues
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(`Connection error: Unable to reach the server at ${backendUrl}. The server may not be running. Check the backend service.`);
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError(`Failed to connect to the server at ${backendUrl}. This could be due to CORS issues, network problems, or the server not running.`);
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred during personalization');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handlePersonalize} disabled={isLoading}>
      {isLoading ? 'Personalizing...' : 'Personalize'}
    </button>
  );
};

export default PersonalizeButton;
