
import { useState, useEffect, useCallback } from 'react';

interface GestureControlsProps {
  onGesture: (gesture: string, data?: any) => void;
  isEnabled: boolean;
}

export const useGestureControls = ({ onGesture, isEnabled }: GestureControlsProps) => {
  const [isActive, setIsActive] = useState(false);
  const [gestureData, setGestureData] = useState<string>('');

  useEffect(() => {
    if (!isEnabled) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      setIsActive(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActive) return;
      
      endX = e.touches[0].clientX;
      endY = e.touches[0].clientY;
      
      // Calculate direction
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setGestureData(deltaX > 0 ? 'Swipe Right' : 'Swipe Left');
      } else {
        setGestureData(deltaY > 0 ? 'Swipe Down' : 'Swipe Up');
      }
    };

    const handleTouchEnd = () => {
      if (!isActive) return;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const minSwipeDistance = 50;
      
      if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            onGesture('swipe-right');
          } else {
            onGesture('swipe-left');
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            onGesture('swipe-down');
          } else {
            onGesture('swipe-up');
          }
        }
      }
      
      setIsActive(false);
      setGestureData('');
    };

    // Mouse events for desktop testing
    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      setIsActive(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive) return;
      
      endX = e.clientX;
      endY = e.clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setGestureData(deltaX > 0 ? 'Swipe Right' : 'Swipe Left');
      } else {
        setGestureData(deltaY > 0 ? 'Swipe Down' : 'Swipe Up');
      }
    };

    const handleMouseUp = () => {
      if (!isActive) return;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const minSwipeDistance = 50;
      
      if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) {
            onGesture('swipe-right');
          } else {
            onGesture('swipe-left');
          }
        } else {
          if (deltaY > 0) {
            onGesture('swipe-down');
          } else {
            onGesture('swipe-up');
          }
        }
      }
      
      setIsActive(false);
      setGestureData('');
    };

    if (isEnabled) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isEnabled, isActive, onGesture]);

  return {
    isActive,
    gestureData
  };
};
