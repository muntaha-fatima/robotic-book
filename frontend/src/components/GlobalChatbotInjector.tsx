import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import React, { useEffect } from 'react';
import FloatingChatbotButton from '@site/src/components/RAGChatbot/FloatingChatbotButton';

let injected = false;

const GlobalChatbotInjector = () => {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  // Only render on the client side, and use useEffect to add to the DOM
  return <FloatingChatbotButton />;
};

export default GlobalChatbotInjector;