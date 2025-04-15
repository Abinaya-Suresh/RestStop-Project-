
import React from "react";
import { Restroom } from "@/types";
import RestroomCard from "./RestroomCard";

interface RestroomListProps {
  restrooms: Restroom[];
}

const RestroomList: React.FC<RestroomListProps> = ({ restrooms }) => {
  if (restrooms.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No restrooms found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {restrooms.map((restroom) => (
        <RestroomCard key={restroom.id} restroom={restroom} />
      ))}
    </div>
  );
};

export default RestroomList;
