
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RestroomDetail from "@/components/Restrooms/RestroomDetail";
import { restroomData } from "@/data/restroomData";

const RestroomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restroom = restroomData.find((r) => r.id === id);

  if (!restroom) {
    return (
      <div className="container py-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Restroom Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The restroom you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/explore">Back to Explore</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Button
        asChild
        variant="ghost"
        className="mb-4"
      >
        <Link to="/explore">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Link>
      </Button>

      <RestroomDetail restroom={restroom} />
    </div>
  );
};

export default RestroomDetailPage;
