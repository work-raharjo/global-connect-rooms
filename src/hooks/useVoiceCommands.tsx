
import { useState, useEffect, useCallback } from 'react';

interface VoiceCommandsProps {
  onCommand: (command: string, params?: any) => void;
  isEnabled: boolean;
}

export const useVoiceCommands = ({ onCommand, isEnabled }: VoiceCommandsProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognitionAPI() as SpeechRecognition;
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        processVoiceCommand(finalTranscript);
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, []);

  const processVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('navigate to') || lowerCommand.includes('find')) {
      const roomMatch = lowerCommand.match(/(?:navigate to|find)\s+(.+)/);
      if (roomMatch) {
        onCommand('navigate', { destination: roomMatch[1] });
      }
    }
    
    // Booking commands
    else if (lowerCommand.includes('book') || lowerCommand.includes('reserve')) {
      const roomMatch = lowerCommand.match(/(?:book|reserve)\s+(.+?)(?:\s+for|\s+at|$)/);
      const timeMatch = lowerCommand.match(/(?:for|at)\s+(\d+(?::\d+)?(?:\s*(?:am|pm))?)/i);
      
      onCommand('book', { 
        room: roomMatch ? roomMatch[1] : null,
        time: timeMatch ? timeMatch[1] : null
      });
    }
    
    // General commands
    else if (lowerCommand.includes('help')) {
      onCommand('help');
    }
    
    else if (lowerCommand.includes('cancel')) {
      onCommand('cancel');
    }
  }, [onCommand]);

  const startListening = useCallback(() => {
    if (recognition && isEnabled) {
      recognition.start();
    }
  }, [recognition, isEnabled]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening
  };
};
