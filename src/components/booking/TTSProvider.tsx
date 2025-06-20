
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TTSContextType {
  speak: (text: string, language?: 'id' | 'en') => void;
  isPlaying: boolean;
  stop: () => void;
  isEnabled: boolean;
  toggleTTS: () => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

interface TTSProviderProps {
  children: ReactNode;
}

export const TTSProvider: React.FC<TTSProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const speak = (text: string, language: 'id' | 'en' = 'en') => {
    if (!speechSynthesis || !isEnabled) return;

    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'id' ? 'id-ID' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleTTS = () => {
    setIsEnabled(!isEnabled);
    if (isPlaying) {
      stop();
    }
  };

  return (
    <TTSContext.Provider value={{
      speak,
      isPlaying,
      stop,
      isEnabled,
      toggleTTS
    }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (context === undefined) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
};
