
import React, { useEffect, useState } from "react";
import ChatInterface from "@/components/Chat/ChatInterface";
import { restroomData, processRestroomData } from "@/data/restroomData";
import { useToast } from "@/hooks/use-toast";

const ChatPage: React.FC = () => {
  const { toast } = useToast();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Get user location if available for better recommendations
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Process restroom data with actual user location when available
          const data = processRestroomData(userLocation);
          console.log("Loaded restroom data for chat assistant:", data.length, "restrooms available");
          setDataLoaded(true);
          
          toast({
            title: "Assistant Ready",
            description: `Loaded data for ${data.length} restrooms. Ask me anything!`,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Fall back to default location data
          console.log("Using default location. Loaded restroom data:", restroomData.length, "restrooms available");
          setDataLoaded(true);
          
          toast({
            title: "Assistant Ready",
            description: `Loaded data for ${restroomData.length} restrooms. Ask me anything!`,
          });
        }
      );
    } else {
      // Geolocation not supported, use default data
      console.log("Geolocation not supported. Using default data:", restroomData.length, "restrooms available");
      setDataLoaded(true);
      
      toast({
        title: "Assistant Ready",
        description: `Loaded data for ${restroomData.length} restrooms. Ask me anything!`,
      });
    }
  }, [toast]);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatInterface />
    </div>
  );
};

export default ChatPage;
