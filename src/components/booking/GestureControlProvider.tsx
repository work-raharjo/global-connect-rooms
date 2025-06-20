
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGestureControls } from '@/hooks/useGestureControls';

interface GestureControlContextType {
  isGestureEnabled: boolean;
  toggleGesture: () => void;
  gestureData: string;
  isActive: boolean;
}

const GestureControlContext = createContext<GestureControlContextType | undefined>(undefined);

interface GestureControlProviderProps {
  children: ReactNode;
}

export const GestureControlProvider: React.FC<GestureControlProviderProps> = ({ children }) => {
  const [isGestureEnabled, setIsGestureEnabled] = useState(false);
  const [idleTimeout, setIdleTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleGesture = (gesture: string) => {
    console.log('Gesture detected:', gesture);
    
    // Handle different gestures
    switch (gesture) {
      case 'swipe-right':
        // Navigate to next menu item
        break;
      case 'swipe-left':
        // Navigate to previous menu item
        break;
      case 'swipe-up':
        // Start navigation or confirm selection
        break;
      case 'swipe-down':
        // Go back or cancel
        break;
    }
  };

  const { isActive, gestureData } = useGestureControls({
    onGesture: handleGesture,
    isEnabled: isGestureEnabled
  });

  // Auto-enable gestures after 5 seconds of idle
  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
      
      const newTimeout = setTimeout(() => {
        if (!isGestureEnabled) {
          setIsGestureEnabled(true);
          console.log('Gesture control auto-enabled due to idle state');
        }
      }, 5000);
      
      setIdleTimeout(newTimeout);
    };

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();

    return () => {
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
    };
  }, [isGestureEnabled, idleTimeout]);

  const toggleGesture = () => {
    setIsGestureEnabled(!isGestureEnabled);
  };

  return (
    <GestureControlContext.Provider value={{
      isGestureEnabled,
      toggleGesture,
      gestureData,
      isActive
    }}>
      {children}
    </GestureControlContext.Provider>
  );
};

export const useGestureControlContext = () => {
  const context = useContext(GestureControlContext);
  if (context === undefined) {
    throw new Error('useGestureControlContext must be used within a GestureControlProvider');
  }
  return context;
};
