
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Navigation, Search, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

const locations = [
  { id: 1, name: "Conference Room A", floor: "2nd Floor", section: "East Wing", coordinates: { x: 75, y: 30 } },
  { id: 2, name: "Meeting Room B", floor: "3rd Floor", section: "West Wing", coordinates: { x: 25, y: 20 } },
  { id: 3, name: "Collaboration Hub", floor: "1st Floor", section: "Central", coordinates: { x: 50, y: 60 } },
  { id: 4, name: "Executive Suite", floor: "4th Floor", section: "North Wing", coordinates: { x: 50, y: 15 } },
  { id: 5, name: "Reception", floor: "Ground Floor", section: "Main Entrance", coordinates: { x: 50, y: 85 } },
  { id: 6, name: "Cafeteria", floor: "1st Floor", section: "South Wing", coordinates: { x: 20, y: 70 } },
  { id: 7, name: "Library", floor: "2nd Floor", section: "Quiet Zone", coordinates: { x: 80, y: 45 } },
  { id: 8, name: "IT Support", floor: "Basement", section: "Technical", coordinates: { x: 30, y: 90 } }
];

const WayfindingDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartNavigation = (locationId: number) => {
    setSelectedDestination(locationId);
    setIsNavigating(true);
    // Simulate navigation completion after 3 seconds
    setTimeout(() => {
      setIsNavigating(false);
      setSelectedDestination(null);
    }, 4000);
  };

  const selectedLocation = locations.find(loc => loc.id === selectedDestination);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Interactive Wayfinding Demo</h1>
          <p className="text-muted-foreground">Navigate your office building with confidence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search and Location List */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Find Your Destination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input 
                  placeholder="Search for rooms, floors, or sections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <div 
                      key={location.id} 
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium">{location.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {location.floor} • {location.section}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleStartNavigation(location.id)}
                        disabled={isNavigating}
                      >
                        <Navigation className="mr-1 h-3 w-3" />
                        Navigate
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">🦽</Badge>
                    <span className="text-sm">Wheelchair Routes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">🔊</Badge>
                    <span className="text-sm">Audio Guidance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">🌐</Badge>
                    <span className="text-sm">Multi-language</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">📱</Badge>
                    <span className="text-sm">Mobile Friendly</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Building Map
                  </span>
                  {isNavigating && (
                    <Badge variant="default" className="animate-pulse">
                      <Zap className="mr-1 h-3 w-3" />
                      Navigating...
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg p-4 h-96 bg-gray-50">
                  {/* Building Map Background */}
                  <div 
                    className="absolute inset-4 bg-center bg-contain bg-no-repeat rounded"
                    style={{
                      backgroundImage: `url(/lovable-uploads/9c05cbf2-121d-4a07-b06d-18a6aa322d2e.png)`
                    }}
                  >
                    {/* Location markers */}
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
                          selectedDestination === location.id 
                            ? 'bg-red-500 ring-4 ring-red-200 animate-pulse scale-150' 
                            : 'bg-blue-500 hover:bg-blue-600 hover:scale-125'
                        }`}
                        style={{
                          left: `${location.coordinates.x}%`,
                          top: `${location.coordinates.y}%`
                        }}
                        title={location.name}
                        onClick={() => handleStartNavigation(location.id)}
                      />
                    ))}
                    
                    {/* Navigation path simulation */}
                    {isNavigating && selectedLocation && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path
                          d={`M 50 85 Q 60 70 ${selectedLocation.coordinates.x} ${selectedLocation.coordinates.y}`}
                          stroke="#22c55e"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="8,4"
                          className="animate-pulse"
                        />
                      </svg>
                    )}

                    {/* You are here marker (green circle like in the image) */}
                    <div 
                      className="absolute w-5 h-5 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 ring-4 ring-green-200 border-2 border-white"
                      style={{ left: '50%', top: '85%' }}
                      title="You are here"
                    />
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg border shadow-sm">
                    <div className="text-xs font-medium mb-2">Legend</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2 ring-2 ring-green-200"></div>
                        <span>Your Location</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>Destinations</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span>Navigation Target</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isNavigating && selectedLocation && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Navigating to {selectedLocation.name}</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Follow the highlighted path • {selectedLocation.floor} • {selectedLocation.section}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-blue-600">
                      <Zap className="mr-1 h-3 w-3" />
                      Estimated arrival: 2 minutes
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WayfindingDemo;
