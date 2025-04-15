
import React from "react";
import { Restroom } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Star,
  Share2,
  ThumbsUp,
  Navigation,
  Heart,
  MessageSquare,
} from "lucide-react";
import { getCleanlinessColor } from "@/utils/helpers";

interface RestroomDetailProps {
  restroom: Restroom;
}

const RestroomDetail: React.FC<RestroomDetailProps> = ({ restroom }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{restroom.name}</h1>
          <div
            className={`${getCleanlinessColor(
              restroom.cleanliness
            )} h-10 w-10 rounded-full flex items-center justify-center text-white font-medium`}
          >
            {restroom.cleanliness.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{restroom.address}</span>
        </div>

        <div className="flex items-center mt-1 text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {restroom.hours?.isOpen ? (
              <span className="text-green-600 font-medium">Open</span>
            ) : (
              <span className="text-red-600 font-medium">Closed</span>
            )}{" "}
            • {restroom.hours?.open} - {restroom.hours?.close}
          </span>
        </div>

        <div className="flex items-center mt-1">
          <span className="text-muted-foreground">Last reported:</span>
          <span className="ml-1 font-medium">{restroom.lastReported}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-muted-foreground">Distance:</span>
          <span className="ml-1 font-medium text-reststop-primary">
            {restroom.distance}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {restroom.amenities.map((amenity) => (
            <Badge
              key={amenity.id}
              variant="outline"
              className="px-3 py-1 bg-muted/40"
            >
              {amenity.name}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <Button className="bg-reststop-primary hover:bg-reststop-primary/90 text-white">
            <Navigation className="h-4 w-4 mr-2" /> Navigate
          </Button>
          <Button variant="outline">
            <ThumbsUp className="h-4 w-4 mr-2" /> Report
          </Button>
          <Button variant="outline">
            <Heart className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-reststop-primary" />
            Reviews ({restroom.reviews.length})
          </h2>
          <div className="mt-4 space-y-4">
            {restroom.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {review.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{review.userName}</div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.date}
                    </div>
                    <p className="mt-2">{review.comment}</p>
                    <div className="mt-2 flex items-center">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestroomDetail;
