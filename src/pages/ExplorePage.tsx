
import React, { useState } from "react";
import { restroomData } from "@/data/restroomData";
import RestroomList from "@/components/Restrooms/RestroomList";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Restroom, SearchFilters, RestroomType } from "@/types";
import { filterRestrooms } from "@/utils/filter-utils";
import {
  MapPin,
  Search,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const restroomTypes: RestroomType[] = [
  "Public",
  "Gas Station",
  "Restaurant",
  "Cafe",
  "Mall",
  "Hotel",
  "Other",
];

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    cleanliness: 0,
    distance: 5,
    openNow: false,
  });

  const [selectedType, setSelectedType] = useState<RestroomType | undefined>(
    undefined
  );

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (value: RestroomType) => {
    setSelectedType(value);
    handleFilterChange("type", value ? [value] : undefined);
  };

  const clearFilters = () => {
    setFilters({
      cleanliness: 0,
      distance: 5,
      openNow: false,
    });
    setSelectedType(undefined);
  };

  const filteredRestrooms: Restroom[] = filterRestrooms(restroomData, filters);

  const searchResults = searchQuery
    ? filteredRestrooms.filter(
        (restroom) =>
          restroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restroom.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredRestrooms;

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Find Restrooms</h1>
        <p className="text-muted-foreground">
          Discover clean and safe restrooms nearby
        </p>
      </div>

      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or address..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1.5"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Collapsible
          open={isFiltersOpen}
          onOpenChange={setIsFiltersOpen}
          className="border rounded-md"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-muted-foreground" />
              <h2 className="text-lg font-medium">Filters</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                Clear Filters
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isFiltersOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent>
            <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="type">Restroom Type</Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) => handleTypeChange(value as RestroomType)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {restroomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cleanliness">Minimum Cleanliness</Label>
                <div className="flex items-center mt-2">
                  <Slider
                    id="cleanliness"
                    max={5}
                    step={0.5}
                    value={[filters.cleanliness || 0]}
                    onValueChange={(value) =>
                      handleFilterChange("cleanliness", value[0])
                    }
                    className="flex-1 mr-2"
                  />
                  <span className="w-8 text-center">
                    {filters.cleanliness || 0}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="distance">Maximum Distance (km)</Label>
                <div className="flex items-center mt-2">
                  <Slider
                    id="distance"
                    max={10}
                    step={0.5}
                    value={[filters.distance || 5]}
                    onValueChange={(value) =>
                      handleFilterChange("distance", value[0])
                    }
                    className="flex-1 mr-2"
                  />
                  <span className="w-8 text-center">
                    {filters.distance || 5}
                  </span>
                </div>
              </div>

              <div>
                <div className="h-6"></div>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="openNow"
                    checked={filters.openNow}
                    onCheckedChange={(checked) =>
                      handleFilterChange("openNow", checked)
                    }
                  />
                  <Label htmlFor="openNow">Open Now</Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-reststop-primary" />
          <span className="font-medium">
            {searchResults.length} restrooms found
          </span>
        </div>
        <Button variant="outline" size="sm">
          View Map
        </Button>
      </div>

      <RestroomList restrooms={searchResults} />
    </div>
  );
};

export default ExplorePage;
