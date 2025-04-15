import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, MessageSquare, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { restroomData } from "@/data/restroomData";
import { userProfile } from "@/data/mockData";
import RestroomCard from "@/components/Restrooms/RestroomCard";
import { getRecommendations } from "@/utils/recommendation-utils";

const Index = () => {
  const [userLocation] = useState({ lat: 11.0168, lng: 76.9558 }); // Coimbatore coordinates
  const recommendedRestrooms = getRecommendations(
    restroomData,
    userLocation,
    userProfile.preferences
  );

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to RestStop</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-reststop-primary to-reststop-primary/80 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold mb-2">Find Nearby Restrooms</h2>
                <p className="text-white/80 mb-4">
                  Discover clean and safe restrooms near your location
                </p>
                <Button
                  asChild
                  className="bg-white text-reststop-primary hover:bg-white/90"
                >
                  <Link to="/explore">
                    <MapPin className="h-4 w-4 mr-2" /> Explore Map
                  </Link>
                </Button>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <MapPin className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-reststop-secondary to-reststop-secondary/80 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold mb-2">Chat Assistant</h2>
                <p className="text-white/80 mb-4">
                  Get help finding the perfect restroom for your needs
                </p>
                <Button
                  asChild
                  className="bg-white text-reststop-secondary hover:bg-white/90"
                >
                  <Link to="/chat">
                    <MessageSquare className="h-4 w-4 mr-2" /> Start Chatting
                  </Link>
                </Button>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <MessageSquare className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-reststop-dark to-reststop-dark/80 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold mb-2">Voice Assistant</h2>
                <p className="text-white/80 mb-4">
                  Hands-free help for finding restrooms while traveling
                </p>
                <Button
                  asChild
                  className="bg-white text-reststop-dark hover:bg-white/90"
                >
                  <Link to="/voice">
                    <Mic className="h-4 w-4 mr-2" /> Voice Commands
                  </Link>
                </Button>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Mic className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <Button asChild variant="ghost">
            <Link to="/recommendations">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recommendedRestrooms.slice(0, 4).map((restroom) => (
            <RestroomCard key={restroom.id} restroom={restroom} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nearby Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Badge variant="outline" className="justify-start py-2 px-3">
                <Star className="h-4 w-4 mr-2 text-yellow-400 fill-yellow-400" />
                Top Rated
              </Badge>
              <Badge variant="outline" className="justify-start py-2 px-3">
                Accessible
              </Badge>
              <Badge variant="outline" className="justify-start py-2 px-3">
                Baby Changing
              </Badge>
              <Badge variant="outline" className="justify-start py-2 px-3">
                Gender Neutral
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Points</div>
                <div className="text-2xl font-bold">{userProfile.points}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Level</div>
                <div className="text-2xl font-bold">{userProfile.level}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Reports</div>
                <div className="text-2xl font-bold">{userProfile.contributions}</div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-reststop-primary"
                style={{ width: `${(userProfile.points % 100) / 100 * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {100 - (userProfile.points % 100)} points to next level
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
