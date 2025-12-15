import React from 'react';
import FloatingChatbotButton from '../RAGChatbot/FloatingChatbotButton';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <>
      {children}
      <FloatingChatbotButton />
    </>
  );
};

export default LayoutWrapper;