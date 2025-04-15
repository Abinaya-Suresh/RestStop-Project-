
import React, { useState } from "react";
import { restroomData } from "@/data/restroomData";
import { userProfile } from "@/data/mockData";
import RestroomList from "@/components/Restrooms/RestroomList";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getRecommendations } from "@/utils/recommendation-utils";
import { Star, Sparkles, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecommendationsPage: React.FC = () => {
  const [userLocation] = useState({ lat: 11.0168, lng: 76.9558 }); // Coimbatore coordinates
  const [preferences, setPreferences] = useState(userProfile.preferences);
  
  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const recommendedRestrooms = getRecommendations(
    restroomData,
    userLocation,
    preferences
  );

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Recommended Restrooms</h1>
        <p className="text-muted-foreground">
          Personalized recommendations based on your preferences
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
              Personalized For You
            </CardTitle>
            <CardDescription>
              Recommendations based on your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="accessibility"
                    checked={preferences.accessibility}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("accessibility", checked)
                    }
                  />
                  <Label htmlFor="accessibility">Accessible Restrooms</Label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="babyChanging"
                    checked={preferences.babyChanging}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("babyChanging", checked)
                    }
                  />
                  <Label htmlFor="babyChanging">Baby Changing Stations</Label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="genderNeutral"
                    checked={preferences.genderNeutral}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("genderNeutral", checked)
                    }
                  />
                  <Label htmlFor="genderNeutral">Gender Neutral</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-reststop-primary" />
              Why We Recommend
            </CardTitle>
            <CardDescription>
              How our recommendation system works
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Our AI considers:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Proximity to your location</li>
              <li>Cleanliness ratings</li>
              <li>Your amenity preferences</li>
              <li>Community feedback</li>
              <li>Your travel patterns</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2 text-reststop-secondary" />
              Help Us Improve
            </CardTitle>
            <CardDescription>
              Rate recommendations to improve results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Do these recommendations match your needs?
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Yes
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Somewhat
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                No
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-reststop-primary" />
          Recommended Restrooms
        </h2>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <RestroomList restrooms={recommendedRestrooms} />
    </div>
  );
};

export default RecommendationsPage;
