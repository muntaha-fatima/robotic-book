import React, { useState, useEffect } from 'react';
import RAGChatbot from './index';
import styles from './floating-button.module.css';

const FloatingChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigateToLogin = () => {
    // Close the modal and navigate to login
    setIsOpen(false);
    window.location.href = '/login';
  };

  const handleNavigateToSignup = () => {
    // Close the modal and navigate to signup
    setIsOpen(false);
    window.location.href = '/signup';
  };

  const handleNavigateToLogout = () => {
    // Close the modal and navigate to login (after logout)
    setIsOpen(false);
    window.location.href = '/login';
  };

  if (isOpen) {
    if (isMobile) {
      // On mobile, show full-screen chatbot
      return (
        <div className={styles.fullScreenContainer}>
          <div className={styles.mobileHeader}>
            <h3>🤖 Robotics Assistant</h3>
            <button
              onClick={toggleChatbot}
              className={styles.closeButton}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>
          <div className={styles.chatbotContainer}>
            <RAGChatbot
              onNavigateToLogin={handleNavigateToLogin}
              onNavigateToSignup={handleNavigateToSignup}
              onNavigateToLogout={handleNavigateToLogout}
              isModal={true}
            />
          </div>
        </div>
      );
    } else {
      // On desktop, show as modal overlay
      return (
        <div className={styles.overlay} onClick={toggleChatbot}>
          <div
            className={styles.chatbotModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>🤖 Robotics Assistant</h3>
              <button
                onClick={toggleChatbot}
                className={styles.closeButton}
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>
            <div className={styles.chatbotContainer}>
              <RAGChatbot
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToSignup={handleNavigateToSignup}
                onNavigateToLogout={handleNavigateToLogout}
                isModal={true}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <button
      className={styles.floatingButton}
      onClick={toggleChatbot}
      aria-label="Open RAG Chatbot"
    >
      <span className={styles.chatIcon}>💬</span>
      <span className={styles.chatText}>Chat</span>
    </button>
  );
};

export default FloatingChatbotButton;