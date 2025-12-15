import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import FloatingChatbotButton from './src/components/RAGChatbot/FloatingChatbotButton';

export default function ChatbotRoot({ children }) {
  if (!ExecutionEnvironment.canUseDOM) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <FloatingChatbotButton />
    </>
  );
}