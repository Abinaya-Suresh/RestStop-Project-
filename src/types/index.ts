
export interface Restroom {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: RestroomType;
  cleanliness: number;
  lastReported: string;
  distance?: string;
  amenities: Amenity[];
  photos?: string[];
  reviews: Review[];
  hours?: {
    open: string;
    close: string;
    isOpen?: boolean;
  };
  partner: boolean;
}

export type RestroomType = 'Public' | 'Gas Station' | 'Restaurant' | 'Cafe' | 'Mall' | 'Hotel' | 'Other';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  level: number;
  contributions: number;
  preferences: {
    accessibility: boolean;
    babyChanging: boolean;
    genderNeutral: boolean;
  };
}

export interface SearchFilters {
  type?: RestroomType[];
  cleanliness?: number;
  distance?: number;
  amenities?: string[];
  openNow?: boolean;
}
