
import React from "react";
import { Link } from "react-router-dom";
import { Restroom } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";
import { getCleanlinessColor } from "@/utils/helpers";

interface RestroomCardProps {
  restroom: Restroom;
}

const RestroomCard: React.FC<RestroomCardProps> = ({ restroom }) => {
  return (
    <Link to={`/restroom/${restroom.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="relative">
            {restroom.partner && (
              <Badge className="absolute top-2 right-2 bg-reststop-primary text-white">
                Partner
              </Badge>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold truncate flex-1">{restroom.name}</h3>
              <div className="flex items-center gap-1 ml-2">
                <div
                  className={`${getCleanlinessColor(
                    restroom.cleanliness
                  )} h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-medium`}
                >
                  {restroom.cleanliness.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="truncate">{restroom.address}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>
                  {restroom.hours?.isOpen ? "Open" : "Closed"} • {restroom.lastReported}
                </span>
              </div>
              <div className="font-medium text-reststop-primary">
                {restroom.distance}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {restroom.amenities.slice(0, 3).map((amenity) => (
                <Badge
                  key={amenity.id}
                  variant="outline"
                  className="text-xs bg-muted/50"
                >
                  {amenity.name}
                </Badge>
              ))}
              {restroom.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs bg-muted/50">
                  +{restroom.amenities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestroomCard;
