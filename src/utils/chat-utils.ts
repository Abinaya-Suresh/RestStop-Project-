import { Restroom } from "@/types";

/**
 * Generate a response for the chat and voice assistants based on user input
 */
export const generateChatResponse = (message: string, restrooms: Restroom[] = []): string => {
  const lowercaseMsg = message.toLowerCase();
  
  // Handle greetings first
  if (lowercaseMsg.match(/^(hi|hello|hey|howdy|greetings|can you hear me)/)) {
    return "Hello! I'm your RestStop assistant. I can help you find restrooms in Coimbatore. Try asking about specific areas like 'Gandipuram' or 'R.S. Puram'.";
  }
  
  // Validate restroom data
  if (!restrooms || restrooms.length === 0) {
    console.error("No restroom data provided to generateChatResponse");
    return "I apologize, but I don't have access to restroom data at the moment. Please try refreshing the page.";
  }

  // Handle location-specific queries - Look for area or neighborhood names in the input
  // First check if it's a specific location query without additional context
  const possibleLocationTerms = lowercaseMsg.split(/\s+/);
  
  // Log all location terms for debugging
  console.log("Possible location terms:", possibleLocationTerms);
  
  // Check if the input is just a location name (like "Gandipuram")
  if (possibleLocationTerms.length <= 2) {
    for (const term of possibleLocationTerms) {
      if (term.length > 3) { // Ignore very short words
        // Check for restrooms with this location in their address
        const locationMatches = restrooms.filter(r => 
          r.address.toLowerCase().includes(term.toLowerCase())
        );
        
        console.log(`Checking location '${term}', found ${locationMatches.length} matches`);
        
        if (locationMatches.length > 0) {
          const topMatches = locationMatches.slice(0, 4);
          return `I found ${locationMatches.length} restrooms in ${term}. Here are the closest ones:\n` +
                 topMatches.map(r => `• ${r.name} (${r.distance}, Rating: ${r.cleanliness.toFixed(1)}/5.0)`).join('\n') +
                 "\nWould you like more details about any of these locations?";
        }
      }
    }
  }
  
  // Handle traditional location-specific queries with more context
  if ((lowercaseMsg.includes("where") || 
       lowercaseMsg.includes("find") || 
       lowercaseMsg.includes("near") || 
       lowercaseMsg.includes("located") || 
       lowercaseMsg.includes("closest") || 
       lowercaseMsg.includes("nearest") || 
       lowercaseMsg.includes("around") || 
       lowercaseMsg.includes("in") || 
       lowercaseMsg.includes("at") || 
       lowercaseMsg.includes("show me")) && 
      (lowercaseMsg.includes("restroom") || 
       lowercaseMsg.includes("toilet") || 
       lowercaseMsg.includes("bathroom") || 
       lowercaseMsg.includes("washroom") || 
       lowercaseMsg.includes("lavatory") || 
       lowercaseMsg.includes("facilities"))) {
    
    // Extract potential location terms from the query
    const words = lowercaseMsg.split(/\s+/);
    const potentialLocationTerms = words.filter(word => 
      word.length > 3 && 
      !["restroom", "toilet", "bathroom", "where", "find", "show", "closest", "nearest"].includes(word)
    );
    
    // Try to find location-specific matches
    for (const locationTerm of potentialLocationTerms) {
      const locationMatches = restrooms.filter(r => 
        r.address.toLowerCase().includes(locationTerm.toLowerCase())
      );
      
      if (locationMatches.length > 0) {
        const matchingRestrooms = locationMatches.slice(0, 3);
        
        const restroomList = matchingRestrooms.map(r => 
          `• ${r.name} (Cleanliness: ${r.cleanliness.toFixed(1)}/5.0, Distance: ${r.distance})`
        ).join('\n');
        
        return `I found ${locationMatches.length} restrooms in ${locationTerm}:\n${restroomList}\nWould you like more details about any of these?`;
      }
    }
    
    // If no location-specific matches, provide nearest options based on available data
    const nearestRestrooms = restrooms.slice(0, 3);
    return "Based on your current location, here are the closest restrooms:\n" + 
           nearestRestrooms.map(r => `• ${r.name} at ${r.address.split(',')[0]} (${r.distance})`).join('\n') + 
           "\nWould you like directions to any of these locations?";
  }
  
  // Handle "send my location" query
  if (lowercaseMsg.includes("location") || 
      lowercaseMsg.includes("send my location") || 
      lowercaseMsg.includes("where am i") ||
      lowercaseMsg.includes("my current location") ||
      lowercaseMsg.includes("current position") ||
      lowercaseMsg.includes("my position")) {
    
    // Get the nearest restrooms to provide with the location response
    const nearestRestrooms = restrooms.slice(0, 3);
    
    return "Based on your current location data, you appear to be near Coimbatore. Here are the closest restrooms:\n" + 
           nearestRestrooms.map(r => `• ${r.name} (${r.distance})`).join('\n') + 
           "\nWould you like directions to any of these locations?";
  }
  
  // Handle simple "restroom" queries without additional context
  if (lowercaseMsg === "restroom" || lowercaseMsg === "restrooms" || 
      lowercaseMsg === "toilet" || lowercaseMsg === "toilets" ||
      lowercaseMsg === "bathroom" || lowercaseMsg === "bathrooms") {
    const nearestRestrooms = restrooms.slice(0, 3);
    return "Here are the closest restrooms to your current location:\n" + 
           nearestRestrooms.map(r => `• ${r.name} (${r.distance})`).join('\n') + 
           "\nWould you like more details about any of these locations?";
  }
  
  // Handle queries about clean restrooms
  if (lowercaseMsg.includes("clean") || lowercaseMsg.includes("cleanest")) {
    const cleanRestrooms = [...restrooms]
      .sort((a, b) => b.cleanliness - a.cleanliness)
      .slice(0, 3);
    
    return `Here are the cleanest restrooms in the area:\n` +
           cleanRestrooms.map(r => `• ${r.name} - ${r.cleanliness.toFixed(1)}/5.0 (${r.distance})`).join('\n') +
           `\n\nAll of these have been highly rated for cleanliness by our users.`;
  }
  
  // Handle accessibility queries
  if (lowercaseMsg.includes("accessible") || lowercaseMsg.includes("wheelchair") || lowercaseMsg.includes("disability")) {
    const accessibleRestrooms = restrooms
      .filter(r => r.amenities.some(a => a.name === "Accessible"))
      .slice(0, 3);
    
    if (accessibleRestrooms.length > 0) {
      return `I found ${accessibleRestrooms.length} wheelchair-accessible restrooms nearby:\n` +
             accessibleRestrooms.map(r => `• ${r.name} (${r.distance})`).join('\n');
    } else {
      return "I'm sorry, I couldn't find accessible restrooms in your immediate area. Would you like me to expand the search radius?";
    }
  }
  
  // Handle baby changing facilities queries
  if (lowercaseMsg.includes("baby") || lowercaseMsg.includes("changing") || lowercaseMsg.includes("diaper")) {
    const changingRestrooms = restrooms
      .filter(r => r.amenities.some(a => a.name === "Baby Changing"))
      .slice(0, 3);
    
    if (changingRestrooms.length > 0) {
      return `I found ${changingRestrooms.length} restrooms with baby changing facilities nearby:\n` +
             changingRestrooms.map(r => `• ${r.name} (${r.distance})`).join('\n');
    } else {
      return "I'm sorry, I couldn't find restrooms with baby changing facilities in your immediate area. Would you like me to suggest alternatives?";
    }
  }
  
  // Handle opening hours queries
  if (lowercaseMsg.includes("open") || lowercaseMsg.includes("hours") || lowercaseMsg.includes("time")) {
    const openRestrooms = restrooms.filter(r => r.hours && r.hours.isOpen);
    if (openRestrooms.length > 0) {
      return `There are ${openRestrooms.length} restrooms currently open near you. The closest ones are:\n` +
             openRestrooms.slice(0, 3).map(r => `• ${r.name} - Open until ${r.hours?.close} (${r.distance})`).join('\n');
    } else {
      return "I'm checking for open restrooms... It appears many facilities in your area might be closed now. Would you like me to find the ones that open earliest tomorrow?";
    }
  }
  
  // Handle help queries
  if ((lowercaseMsg.includes("how") && lowercaseMsg.includes("work")) || 
      (lowercaseMsg.includes("what") && lowercaseMsg.includes("do")) || 
      lowercaseMsg.includes("help me") || 
      lowercaseMsg === "help") {
    return "RestStop helps you find clean restrooms nearby. You can:\n" +
           "• Search for restrooms by location\n" +
           "• Filter by cleanliness, accessibility, or amenities\n" +
           "• Get real-time information about opening hours\n" +
           "• Read and leave reviews\n" +
           "• Use voice commands for hands-free operation\n\n" +
           "What would you like help with today?";
  }
  
  // Check for specific restroom mentions
  for (const restroom of restrooms) {
    if (lowercaseMsg.includes(restroom.name.toLowerCase())) {
      return `${restroom.name} has a cleanliness rating of ${restroom.cleanliness.toFixed(1)}/5.0. ` +
             `It's located at ${restroom.address} (${restroom.distance} away). ` +
             `${restroom.hours?.isOpen ? "It's currently open until " + restroom.hours.close + "." : "It's currently closed."} ` +
             `${restroom.reviews.length > 0 ? `Recent review: "${restroom.reviews[0].comment}"` : "No reviews available yet."}`;
    }
  }
  
  // Handle thank you messages
  if (lowercaseMsg.includes("thank")) {
    const responses = [
      "You're welcome! Happy to help you find what you need. Safe travels!",
      "Glad I could assist! Feel free to ask if you need anything else.",
      "My pleasure! That's what I'm here for. Anything else I can help with?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // When we can't match the query to any specific intent
  return "I'm not sure I understand what you're looking for. You can ask me about:\n" +
         "• Finding restrooms near you\n" +
         "• Your current location\n" +
         "• Restrooms with specific amenities (accessible, baby changing)\n" +
         "• Clean restrooms in the area\n" +
         "• Opening hours for nearby facilities\n\n" +
         "Could you try rephrasing your question?";
};
