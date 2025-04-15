
import { Amenity, Restroom, Review } from "@/types";

export const amenities: Amenity[] = [
  { id: "1", name: "Baby Changing", icon: "baby" },
  { id: "2", name: "Accessible", icon: "wheelchair" },
  { id: "3", name: "Gender Neutral", icon: "users" },
  { id: "4", name: "Changing Room", icon: "shirt" },
  { id: "5", name: "Air Dryer", icon: "wind" },
  { id: "6", name: "Paper Towels", icon: "scroll" },
  { id: "7", name: "Feminine Products", icon: "package" },
  { id: "8", name: "Toilet Seat Covers", icon: "ban" }
];

export const reviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah T.",
    rating: 4,
    comment: "Very clean and well-maintained. Soap dispenser was empty though.",
    date: "2023-05-15",
    helpful: 12
  },
  {
    id: "2",
    userId: "user2",
    userName: "Mark R.",
    rating: 5,
    comment: "Spotless and modern facilities. Highly recommend!",
    date: "2023-04-20",
    helpful: 8
  },
  {
    id: "3",
    userId: "user3",
    userName: "Jamie L.",
    rating: 3,
    comment: "Average cleanliness but convenient location.",
    date: "2023-05-02",
    helpful: 3
  }
];

export const mockRestrooms: Restroom[] = [
  {
    id: "1",
    name: "Central Park Public Restroom",
    address: "Central Park, New York, NY",
    lat: 40.7812,
    lng: -73.9665,
    type: "Public",
    cleanliness: 4.2,
    lastReported: "10 min ago",
    distance: "0.3 mi",
    amenities: [amenities[0], amenities[1], amenities[5]],
    reviews: [reviews[0], reviews[1]],
    hours: {
      open: "08:00",
      close: "20:00",
      isOpen: true
    },
    partner: false
  },
  {
    id: "2",
    name: "Starbucks - Times Square",
    address: "1540 Broadway, New York, NY",
    lat: 40.7580,
    lng: -73.9855,
    type: "Cafe",
    cleanliness: 4.7,
    lastReported: "25 min ago",
    distance: "0.8 mi",
    amenities: [amenities[1], amenities[2], amenities[4], amenities[5]],
    photos: ["starbucks.jpg"],
    reviews: [reviews[1], reviews[2]],
    hours: {
      open: "06:00",
      close: "22:00",
      isOpen: true
    },
    partner: true
  },
  {
    id: "3",
    name: "Grand Central Terminal",
    address: "89 E 42nd St, New York, NY",
    lat: 40.7527,
    lng: -73.9772,
    type: "Other",
    cleanliness: 3.8,
    lastReported: "1 hour ago",
    distance: "1.2 mi",
    amenities: [amenities[0], amenities[1], amenities[2], amenities[3], amenities[6]],
    reviews: [reviews[0], reviews[2]],
    hours: {
      open: "05:30",
      close: "01:00",
      isOpen: true
    },
    partner: false
  },
  {
    id: "4",
    name: "Hilton Midtown Hotel",
    address: "1335 Avenue of the Americas, New York, NY",
    lat: 40.7629,
    lng: -73.9794,
    type: "Hotel",
    cleanliness: 4.9,
    lastReported: "15 min ago",
    distance: "0.5 mi",
    amenities: [amenities[0], amenities[1], amenities[3], amenities[4], amenities[5], amenities[6], amenities[7]],
    photos: ["hilton.jpg"],
    reviews: [reviews[1]],
    hours: {
      open: "00:00",
      close: "23:59",
      isOpen: true
    },
    partner: true
  },
  {
    id: "5",
    name: "BP Gas Station",
    address: "300 W 57th St, New York, NY",
    lat: 40.7670,
    lng: -73.9834,
    type: "Gas Station",
    cleanliness: 3.2,
    lastReported: "2 hours ago",
    distance: "0.7 mi",
    amenities: [amenities[5]],
    reviews: [reviews[2]],
    hours: {
      open: "00:00",
      close: "23:59",
      isOpen: true
    },
    partner: true
  }
];

export const userProfile = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "avatar.jpg",
  points: 350,
  level: 4,
  contributions: 15,
  preferences: {
    accessibility: true,
    babyChanging: false,
    genderNeutral: true
  }
};

export const mockMessages = [
  {
    id: "1",
    text: "Hello! I'm RestStop Assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date().toISOString()
  }
];
