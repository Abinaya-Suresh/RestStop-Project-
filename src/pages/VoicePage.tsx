
import React, { useEffect, useState } from "react";
import VoiceAssistant from "@/components/Voice/VoiceAssistant";
import { restroomData } from "@/data/restroomData";
import { useToast } from "@/hooks/use-toast";
import { Restroom } from "@/types";

const VoicePage: React.FC = () => {
  const { toast } = useToast();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [processedData, setProcessedData] = useState<Restroom[]>([]);

  useEffect(() => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const data = restroomData;
            console.log("Restroom data loaded with geolocation:", data.length, "restrooms");
            setProcessedData(data);
            setDataLoaded(true);
            
            toast({
              title: "Voice Assistant Ready",
              description: `Loaded ${data.length} restrooms. Try asking about nearby facilities.`,
            });
          },
          (error) => {
            console.log("Geolocation error, using default data:", error);
            setProcessedData(restroomData);
            setDataLoaded(true);
            
            toast({
              title: "Voice Assistant Ready",
              description: `Loaded ${restroomData.length} restrooms. Location access denied.`,
            });
          }
        );
      } else {
        console.log("Geolocation not supported, using default data");
        setProcessedData(restroomData);
        setDataLoaded(true);
        
        toast({
          title: "Voice Assistant Ready",
          description: `Loaded ${restroomData.length} restrooms. Location not available.`,
        });
      }
    } catch (error) {
      console.error("Error loading restroom data:", error);
      toast({
        title: "Error",
        description: "Failed to initialize restroom data. Please refresh.",
        variant: "destructive"
      });
    }
  }, [toast]);

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Voice Assistant</h1>
      <div className="text-center text-slate-600 mb-6">
        <p>Ask about specific locations like "Gandipuram" or "R.S. Puram"</p>
        <p className="text-sm mt-1">Data available for {processedData.length} restrooms in Coimbatore</p>
      </div>
      {dataLoaded && <VoiceAssistant restroomData={processedData} />}
    </div>
  );
};

export default VoicePage;
