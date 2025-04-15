
import { Restroom } from "@/types";
import { formatDistance } from "@/utils/helpers";

// Sample restroom data for testing
const rawRestroomData = [
  {
    "Name": "Gandipuram Public Toilet",
    "Location": "Gandipuram, Coimbatore",
    "Type": "Public",
    "Cleanliness Rating": 4.2,
    "Accessibility": "Yes",
    "Review": "Clean and well maintained facility",
    "Tag": "clean"
  },
  {
    "Name": "RS Puram Restroom",
    "Location": "R.S. Puram, Coimbatore",
    "Type": "Public",
    "Cleanliness Rating": 3.8,
    "Accessibility": "Yes",
    "Review": "Decent facility with regular maintenance",
    "Tag": "accessible"
  },
  {
    "Name": "Saibaba Colony Toilet",
    "Location": "Saibaba Colony, Coimbatore",
    "Type": "Public",
    "Cleanliness Rating": 4.0,
    "Accessibility": "Yes",
    "Review": "Clean restroom with good facilities",
    "Tag": "clean"
  },
  {
    "Name": "Peelamedu Rest Stop",
    "Location": "Peelamedu, Coimbatore",
    "Type": "Gas Station",
    "Cleanliness Rating": 3.5,
    "Accessibility": "No",
    "Review": "Average cleanliness but convenient location",
    "Tag": "average"
  },
  {
    "Name": "Race Course Road Toilet",
    "Location": "Race Course, Coimbatore",
    "Type": "Restaurant",
    "Cleanliness Rating": 4.5,
    "Accessibility": "Yes",
    "Review": "Very clean with excellent maintenance",
    "Tag": "clean"
  }
  // Additional entries to make the total 5 restrooms
];

// Process the raw data into our application format
export const processRestroomData = (userLocation: { lat: number; lng: number }): Restroom[] => {
  console.log("Processing restroom data with location:", userLocation);
  
  // Generate random coordinates near Coimbatore for our restrooms
  const coimbatoreCenter = { lat: 11.0168, lng: 76.9558 }; // Coordinates for Coimbatore
  
  return rawRestroomData.map((item, index) => {
    // Generate a random location within ~2km of Coimbatore center
    const randomLat = coimbatoreCenter.lat + (Math.random() - 0.5) * 0.04;
    const randomLng = coimbatoreCenter.lng + (Math.random() - 0.5) * 0.04;
    
    // Extract location area from the full location string
    const locationArea = item.Location.split(',')[0].trim();
    
    // Determine if this should be a partner location (randomly)
    const isPartner = index % 10 === 0; // Make every 10th restroom a partner
    
    // Generate random opening hours
    const openHour = 6 + Math.floor(Math.random() * 3); // 6-8 AM
    const closeHour = 19 + Math.floor(Math.random() * 4); // 7-10 PM
    const isOpen = new Date().getHours() >= openHour && new Date().getHours() < closeHour;
    
    // Generate a random recent reporting time (within the last 48 hours)
    const reportedHoursAgo = Math.floor(Math.random() * 48);
    const lastReported = reportedHoursAgo <= 1 
      ? `${reportedHoursAgo === 0 ? 'Just now' : '1 hour ago'}`
      : `${reportedHoursAgo} hours ago`;
    
    // Generate amenities based on accessibility and cleanliness
    const amenities = [
      {
        id: `amenity-toilet-${index}`,
        name: "Toilet",
        icon: "toilet"
      }
    ];
    
    // Add accessibility amenity if applicable
    if (item.Accessibility === "Yes") {
      amenities.push({
        id: `amenity-accessible-${index}`,
        name: "Accessible",
        icon: "wheelchair"
      });
    }
    
    // Add additional amenities based on cleanliness
    if (item["Cleanliness Rating"] >= 3.5) {
      amenities.push({
        id: `amenity-washing-${index}`,
        name: "Hand Washing",
        icon: "droplets"
      });
      
      // Higher-rated restrooms have more amenities
      if (item["Cleanliness Rating"] >= 4.0) {
        amenities.push({
          id: `amenity-changing-${index}`,
          name: "Baby Changing",
          icon: "baby"
        });
      }
      
      if (item["Cleanliness Rating"] >= 4.5 && Math.random() > 0.5) {
        amenities.push({
          id: `amenity-gender-${index}`,
          name: "Gender Neutral",
          icon: "users"
        });
      }
    }
    
    // Generate sample reviews
    const reviewCount = 1 + Math.floor(Math.random() * 3); // 1-3 reviews
    const reviews = [{
      id: `review-main-${index}`,
      userId: `user-${index}-1`,
      userName: `User${100 + Math.floor(Math.random() * 900)}`,
      rating: item["Cleanliness Rating"],
      comment: item.Review,
      date: `${Math.floor(Math.random() * 10) + 1} days ago`,
      helpful: Math.floor(Math.random() * 10)
    }];
    
    // Add additional reviews if needed
    for (let i = 1; i < reviewCount; i++) {
      const reviewRating = Math.max(1, Math.min(5, 
        item["Cleanliness Rating"] + (Math.random() - 0.5) * 1.5
      ));
      
      let reviewComment = "";
      if (reviewRating >= 4) {
        reviewComment = ["Clean and well maintained.", "Very satisfactory experience!", "Would definitely use again."][Math.floor(Math.random() * 3)];
      } else if (reviewRating >= 2.5) {
        reviewComment = ["Adequate but could be better.", "Acceptable for emergency use.", "Not bad, not great."][Math.floor(Math.random() * 3)];
      } else {
        reviewComment = ["Avoid if possible.", "Needs serious improvement.", "Unhygienic conditions."][Math.floor(Math.random() * 3)];
      }
      
      reviews.push({
        id: `review-${index}-${i}`,
        userId: `user-${index}-${i+1}`,
        userName: `User${100 + Math.floor(Math.random() * 900)}`,
        rating: reviewRating,
        comment: reviewComment,
        date: `${Math.floor(Math.random() * 30) + 1} days ago`,
        helpful: Math.floor(Math.random() * 5)
      });
    }
    
    // No longer generating photos for restrooms
    
    return {
      id: `restroom-${index + 1}`,
      name: item.Name,
      address: item.Location,
      lat: randomLat,
      lng: randomLng,
      type: item.Type as any, // We'll need to update the type definition
      cleanliness: item["Cleanliness Rating"],
      lastReported: lastReported,
      amenities: amenities,
      distance: formatDistance(
        Math.sqrt(
          Math.pow(userLocation.lat - randomLat, 2) + 
          Math.pow(userLocation.lng - randomLng, 2)
        ) * 111.32 // Rough conversion from degrees to kilometers
      ),
      reviews: reviews,
      // photos field is now omitted
      hours: {
        open: `${openHour}:00 AM`,
        close: `${closeHour}:00 PM`,
        isOpen: isOpen
      },
      partner: isPartner
    };
  });
};

// Default dataset with a user location at Coimbatore city center
export const restroomData = processRestroomData({ lat: 11.0168, lng: 76.9558 });
console.log("Default restroom data generated:", restroomData.length, "restrooms");
