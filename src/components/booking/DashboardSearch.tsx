
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Calendar, Filter } from "lucide-react";
import { useTTS } from './TTSProvider';

interface SearchFilters {
  capacity: number | null;
  location: string;
  availability: 'available' | 'all';
  features: string[];
}

interface DashboardSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

export const DashboardSearch: React.FC<DashboardSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    capacity: null,
    location: '',
    availability: 'available',
    features: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const { speak } = useTTS();

  const handleSearch = () => {
    onSearch(searchQuery, filters);
    speak(`Searching for ${searchQuery || 'meeting rooms'}`);
  };

  const handleCapacityFilter = (capacity: number) => {
    setFilters(prev => ({ ...prev, capacity }));
    speak(`Filtering rooms for ${capacity} people`);
  };

  const locations = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'];
  const features = ['Projector', 'Video Conference', 'Whiteboard', 'TV Display'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Meeting Rooms
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Search by room name, floor, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Capacity Filters */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">Quick filters:</span>
          {[2, 4, 6, 10, 15, 20].map((capacity) => (
            <Button
              key={capacity}
              variant={filters.capacity === capacity ? "default" : "outline"}
              size="sm"
              onClick={() => handleCapacityFilter(capacity)}
              className="text-xs"
            >
              <Users className="h-3 w-3 mr-1" />
              {capacity}+
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            {/* Location Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <div className="grid grid-cols-2 gap-2">
                {locations.map((location) => (
                  <Button
                    key={location}
                    variant={filters.location === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({ 
                      ...prev, 
                      location: prev.location === location ? '' : location 
                    }))}
                    className="text-xs"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Features Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Features</label>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature) => (
                  <Button
                    key={feature}
                    variant={filters.features.includes(feature) ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      features: prev.features.includes(feature)
                        ? prev.features.filter(f => f !== feature)
                        : [...prev.features, feature]
                    }))}
                    className="text-xs"
                  >
                    {feature}
                  </Button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Availability</label>
              <div className="flex gap-2">
                <Button
                  variant={filters.availability === 'available' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, availability: 'available' }))}
                >
                  Available Only
                </Button>
                <Button
                  variant={filters.availability === 'all' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, availability: 'all' }))}
                >
                  Show All
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(filters.capacity || filters.location || filters.features.length > 0) && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.capacity && (
              <Badge variant="secondary" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                {filters.capacity}+ people
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {filters.location}
              </Badge>
            )}
            {filters.features.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
