
import { Restroom, SearchFilters } from "@/types";

/**
 * Filter restrooms based on provided search filters
 */
export const filterRestrooms = (restrooms: Restroom[], filters: SearchFilters): Restroom[] => {
  return restrooms.filter(restroom => {
    if (filters.type && filters.type.length > 0 && !filters.type.includes(restroom.type)) {
      return false;
    }

    if (filters.cleanliness && restroom.cleanliness < filters.cleanliness) {
      return false;
    }

    if (filters.distance && restroom.distance) {
      const distanceValue = parseFloat(restroom.distance.split(' ')[0]);
      if (distanceValue > filters.distance) {
        return false;
      }
    }

    if (filters.amenities && filters.amenities.length > 0) {
      const restroomAmenityIds = restroom.amenities.map(a => a.id);
      if (!filters.amenities.every(id => restroomAmenityIds.includes(id))) {
        return false;
      }
    }

    if (filters.openNow && restroom.hours) {
      return restroom.hours.isOpen === true;
    }

    return true;
  });
};
