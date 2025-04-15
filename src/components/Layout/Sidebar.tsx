import React from "react";
import { Link } from "react-router-dom";
import { Home, Map, MessageSquare, Settings, Star, Users, Mic, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userProfile } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar: React.FC = () => {
  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-1 font-semibold">
          <span className="font-bold text-xl text-reststop-primary">Rest</span>
          <span className="font-bold text-xl text-reststop-secondary">Stop</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar>
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">{userProfile.name}</div>
              <div className="text-xs text-muted-foreground">Level {userProfile.level}</div>
            </div>
          </div>
          <div className="h-4"></div>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/explore">
              <Map className="h-4 w-4" />
              Explore
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/chat">
              <MessageSquare className="h-4 w-4" />
              Chat Assistant
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/voice">
              <Mic className="h-4 w-4" />
              Voice Assistant
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/recommendations">
              <Star className="h-4 w-4" />
              Recommendations
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/community">
              <Users className="h-4 w-4" />
              Community
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/add-restroom">
              <PlusCircle className="h-4 w-4" />
              Add Restroom
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link to="/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <div className="rounded-lg bg-reststop-primary/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-reststop-primary" />
            <span className="text-sm font-medium">Contribution Points</span>
          </div>
          <div className="text-xl font-bold">{userProfile.points} pts</div>
          <div className="mt-2 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-reststop-primary"
              style={{ width: `${(userProfile.points % 100) / 100 * 100}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {100 - (userProfile.points % 100)} points to next level
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;