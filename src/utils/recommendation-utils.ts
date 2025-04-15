
import { Restroom } from "@/types";
import { calculateDistance, formatDistance } from "./geo-utils";

/**
 * Get personalized restroom recommendations based on user location and preferences
 */
export const getRecommendations = (
  restrooms: Restroom[],
  userLocation: { lat: number; lng: number },
  userPreferences: any
): Restroom[] => {
  const withDistance = restrooms.map(restroom => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restroom.lat,
      restroom.lng
    );
    return {
      ...restroom,
      distance: formatDistance(distance),
      distanceValue: distance
    };
  });

  return withDistance
    .sort((a: any, b: any) => {
      const distanceScore = (b.distanceValue - a.distanceValue) * 2;
      const cleanlinessScore = (a.cleanliness - b.cleanliness) * 3;
      let preferenceScore = 0;
      if (userPreferences) {
        if (userPreferences.accessibility && a.amenities.some(am => am.name === "Accessible")) {
          preferenceScore += 2;
        }
        if (userPreferences.babyChanging && a.amenities.some(am => am.name === "Baby Changing")) {
          preferenceScore += 2;
        }
        if (userPreferences.genderNeutral && a.amenities.some(am => am.name === "Gender Neutral")) {
          preferenceScore += 2;
        }
      }
      const partnerBonus = a.partner ? 1 : 0;
      return distanceScore + cleanlinessScore + preferenceScore + partnerBonus;
    })
    .slice(0, 5);
};
