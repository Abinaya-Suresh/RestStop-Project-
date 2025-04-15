import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, AlertTriangle } from "lucide-react";
import { generateChatResponse } from "@/utils/chat-utils";
import { configureSpeechRecognition, speakResponse, extractPossibleLocationNames } from "@/utils/speech-utils";
import { Restroom } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface VoiceAssistantProps {
  restroomData: Restroom[];
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ restroomData }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("VoiceAssistant received restroomData:", restroomData);
    console.log("Number of restrooms:", restroomData?.length || 0);
    
    if (restroomData && restroomData.length > 0) {
      setDataAvailable(true);
      
      // Log first restroom details for verification
      console.log("First restroom details in VoiceAssistant:", restroomData[0]);
    } else {
      console.error("No restroom data available in VoiceAssistant");
      setDataAvailable(false);
      
      toast({
        title: "Data Error",
        description: "No restroom data found. Please reload the page.",
        variant: "destructive"
      });
    }
  }, [restroomData, toast]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI();
        configureSpeechRecognition(recognitionRef.current);
        
        recognitionRef.current.onresult = (event: any) => {
          const result = event.results[event.results.length - 1];
          const transcript = result[0].transcript;
          
          setTranscript(transcript);
          
          if (result.isFinal) {
            console.log("Voice recognition final result:", transcript);
            
            const possibleNames = extractPossibleLocationNames(event.results);
            console.log("Possible location names:", possibleNames);
            
            setProcessing(true);
            
            if (transcript) {
              console.log("Generating response with transcript:", transcript);
              console.log("Using restroom data:", restroomData?.length || 0, "items");
              
              try {
                const aiResponse = generateChatResponse(transcript, restroomData || []);
                console.log("AI response generated:", aiResponse);
                setResponse(aiResponse);
                
                if (!isMuted) {
                  speakResponse(aiResponse);
                }
              } catch (error) {
                console.error("Error generating response:", error);
                setError("Failed to generate response. Please try again.");
                toast({
                  title: "Error",
                  description: "Failed to process your request. Please try again.",
                  variant: "destructive"
                });
              } finally {
                setProcessing(false);
              }
            } else {
              setProcessing(false);
            }
          }
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          setProcessing(false);
          setError(`Recognition error: ${event.error}`);
          toast({
            title: "Voice Recognition Error",
            description: `Error: ${event.error}. Please try again.`,
            variant: "destructive",
          });
        };
        
        recognitionRef.current.onend = () => {
          console.log("Speech recognition ended");
          setIsListening(false);
          
          if (!processing) {
            setProcessing(false);
          }
        };
      } else {
        setIsSupported(false);
        toast({
          title: "Not Supported",
          description: "Speech recognition is not supported in your browser. Try Chrome or Edge.",
          variant: "destructive",
        });
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isMuted, toast, processing]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    console.log("Starting listening. Data available:", dataAvailable);
    console.log("Restroom data length:", restroomData.length);
    
    setError(null);
    
    if (!recognitionRef.current) {
      toast({
        title: "Not Available",
        description: "Speech recognition is not available. Please try a different browser.",
        variant: "destructive",
      });
      return;
    }
    
    if (restroomData.length === 0) {
      toast({
        title: "No Data Available",
        description: "Restroom data is not loaded. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsListening(true);
    setTranscript("");
    
    try {
      recognitionRef.current.start();
      toast({
        title: "Listening",
        description: "Say something about restrooms or mention a location in Coimbatore...",
      });
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      setIsListening(false);
      setError("Failed to start speech recognition");
      toast({
        title: "Error",
        description: "Failed to start voice recognition. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Voice Output Enabled" : "Voice Output Disabled",
      description: isMuted ? "You will now hear responses" : "Responses will be shown as text only",
    });
  };

  const getExampleQueries = () => {
    const examples = [
      "Where is the nearest restroom?",
      "Find restrooms in Gandipuram",
      "R.S. Puram",
      "Are there clean restrooms in Saibaba Colony?",
      "Show restrooms with baby changing facilities",
      "Find restrooms in Peelamedu",
      "Is there a restroom open now?"
    ];
    
    return examples
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <p className="text-muted-foreground">
          {isSupported 
            ? dataAvailable 
              ? `Ask questions about ${restroomData.length} nearby restrooms in Coimbatore` 
              : "Loading restroom data..."
            : "Voice recognition is not supported in your browser. Try Chrome or Edge."}
        </p>
      </div>

      <div className="relative mb-8">
        <div
          className={`h-36 w-36 rounded-full flex items-center justify-center bg-reststop-primary/10 ${
            isListening || processing ? "animate-pulse-subtle" : ""
          }`}
        >
          <div
            className={`h-28 w-28 rounded-full flex items-center justify-center ${
              isListening || processing
                ? "bg-reststop-primary text-white"
                : "bg-muted text-reststop-primary"
            } transition-colors duration-200`}
          >
            {isListening ? (
              <Mic className="h-10 w-10" />
            ) : (
              <MicOff className="h-10 w-10" />
            )}
          </div>
        </div>
        {isListening && (
          <div className="absolute -bottom-1 left-0 right-0 flex justify-center">
            <div className="px-4 py-1 bg-reststop-primary text-white text-sm rounded-full">
              Listening...
            </div>
          </div>
        )}
        {processing && !isListening && (
          <div className="absolute -bottom-1 left-0 right-0 flex justify-center">
            <div className="px-4 py-1 bg-amber-500 text-white text-sm rounded-full">
              Processing...
            </div>
          </div>
        )}
      </div>

      <div className="w-full space-y-4 mb-8">
        {transcript && (
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">You said:</div>
              <p className="font-medium">{transcript}</p>
            </CardContent>
          </Card>
        )}

        {response && (
          <Card className="border-reststop-primary/30">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Response:</div>
              <p className="whitespace-pre-line">{response}</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          size="lg"
          className={`rounded-full h-14 w-14 ${
            isListening ? "bg-red-500 hover:bg-red-600" : "bg-reststop-primary hover:bg-reststop-primary/90"
          }`}
          onClick={toggleListening}
          disabled={!isSupported || processing || !dataAvailable}
        >
          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={toggleMute}
          disabled={!isSupported}
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>
      </div>

      <div className="mt-6 text-sm text-muted-foreground text-center">
        <p>Try saying: "{getExampleQueries().join('" or "')}"</p>
      </div>
    </div>
  );
};

export default VoiceAssistant;
