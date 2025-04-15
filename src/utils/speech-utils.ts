/**
 * Speech recognition and synthesis utility functions
 */

// Add type definitions for SpeechRecognition
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives?: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart?: (event: Event) => void;
  onend?: (event: Event) => void;
  onerror?: (event: SpeechRecognitionErrorEvent) => void;
  onresult?: (event: SpeechRecognitionEvent) => void;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

/**
 * Configuration for speech recognition
 */
export const configureSpeechRecognition = (recognition: SpeechRecognition | null): void => {
  if (!recognition) return;
  
  // Set recognition parameters for better accuracy
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  // Increase max alternatives to improve location name recognition
  if ('maxAlternatives' in recognition) {
    (recognition as any).maxAlternatives = 3;
  }
};

/**
 * Speak text using the browser's speech synthesis
 */
export const speakResponse = (text: string, rate: number = 1.0): void => {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // Speech rate (0.1 to 10)
  utterance.pitch = 1.0; // Normal pitch
  
  // Use a more natural voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => 
    voice.lang.startsWith('en-') && !voice.name.includes('Google')
  );
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  window.speechSynthesis.speak(utterance);
};

/**
 * Extract location names from speech recognition alternatives
 * This can help with identifying location names more accurately
 */
export const extractPossibleLocationNames = (results: SpeechRecognitionResultList): string[] => {
  const possibleLocations: string[] = [];
  
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    
    // Check all alternatives for the last result
    for (let j = 0; j < result.length; j++) {
      const transcript = result[j].transcript.trim();
      
      // Skip very short phrases
      if (transcript.length < 3) continue;
      
      // Add the full transcript
      possibleLocations.push(transcript);
      
      // Also add individual words that might be location names
      // (typically proper nouns that are capitalized in text)
      const words = transcript.split(/\s+/);
      for (const word of words) {
        if (word.length > 3 && !['find', 'show', 'where', 'the', 'and', 'restroom', 'toilet'].includes(word.toLowerCase())) {
          possibleLocations.push(word);
        }
      }
    }
  }
  
  return [...new Set(possibleLocations)]; // Remove duplicates
};

// Extend window interface to include SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export {};
