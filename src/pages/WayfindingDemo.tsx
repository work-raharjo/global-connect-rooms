
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Navigation, Search, Zap, Mic, MicOff, Hand } from "lucide-react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

// Updated locations to match the isometric building image layout
const locations = [
  // Ground Floor - positioned according to the isometric building image
  { id: 1, name: "Main Reception", floor: "Ground Floor", section: "Entrance", coordinates: { x: 62, y: 82 }, floorLevel: 0 },
  { id: 2, name: "Security Desk", floor: "Ground Floor", section: "Lobby", coordinates: { x: 45, y: 78 }, floorLevel: 0 },
  { id: 3, name: "Cafeteria", floor: "Ground Floor", section: "West Wing", coordinates: { x: 30, y: 75 }, floorLevel: 0 },
  
  // First Floor - positioned on the first level of the building
  { id: 4, name: "Conference Room A", floor: "1st Floor", section: "East Wing", coordinates: { x: 70, y: 60 }, floorLevel: 1 },
  { id: 5, name: "Collaboration Hub", floor: "1st Floor", section: "Central", coordinates: { x: 55, y: 58 }, floorLevel: 1 },
  { id: 6, name: "Meeting Room B", floor: "1st Floor", section: "West Wing", coordinates: { x: 35, y: 55 }, floorLevel: 1 },
  
  // Second Floor - positioned on the second level
  { id: 7, name: "Library", floor: "2nd Floor", section: "Quiet Zone", coordinates: { x: 65, y: 45 }, floorLevel: 2 },
  { id: 8, name: "Study Rooms", floor: "2nd Floor", section: "Central", coordinates: { x: 50, y: 42 }, floorLevel: 2 },
  { id: 9, name: "Training Room", floor: "2nd Floor", section: "West Wing", coordinates: { x: 32, y: 40 }, floorLevel: 2 },
  
  // Third Floor - positioned on the top level
  { id: 10, name: "Executive Suite", floor: "3rd Floor", section: "North Wing", coordinates: { x: 55, y: 28 }, floorLevel: 3 },
  { id: 11, name: "Board Room", floor: "3rd Floor", section: "East Wing", coordinates: { x: 68, y: 30 }, floorLevel: 3 },
  { id: 12, name: "IT Support", floor: "3rd Floor", section: "West Wing", coordinates: { x: 38, y: 25 }, floorLevel: 3 }
];

const WayfindingDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isGestureEnabled, setIsGestureEnabled] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentFloorLocations = locations.filter(loc => loc.floorLevel === selectedFloor);

  const handleStartNavigation = (locationId: number) => {
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedFloor(location.floorLevel);
      setSelectedDestination(locationId);
      setIsNavigating(true);
      // Simulate navigation completion after 4 seconds
      setTimeout(() => {
        setIsNavigating(false);
        setSelectedDestination(null);
      }, 4000);
    }
  };

  const handleVoiceCommand = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      // Simulate voice recognition
      setVoiceCommand('Listening for voice commands...');
      setTimeout(() => {
        setVoiceCommand('Say "Navigate to [room name]" or "Find [location]"');
      }, 2000);
    } else {
      setVoiceCommand('');
    }
  };

  const handleGestureControl = () => {
    setIsGestureEnabled(!isGestureEnabled);
  };

  const selectedLocation = locations.find(loc => loc.id === selectedDestination);
  const floors = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'];

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
          <h1 className="text-3xl font-bold mb-2">Inclusive Wayfinding Demo</h1>
          <p className="text-muted-foreground">Navigate with voice, gesture, and visual assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search and Location List */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    Find Your Destination
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={isVoiceEnabled ? "default" : "outline"}
                      onClick={handleVoiceCommand}
                    >
                      {isVoiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isGestureEnabled ? "default" : "outline"}
                      onClick={handleGestureControl}
                    >
                      <Hand className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input 
                  placeholder="Search for rooms, floors, or sections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                
                {voiceCommand && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">{voiceCommand}</p>
                  </div>
                )}
                
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
                <CardTitle className="text-lg">Inclusive Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">🎤</Badge>
                      <span className="text-sm">Voice Commands</span>
                    </div>
                    <Badge variant={isVoiceEnabled ? "default" : "secondary"}>
                      {isVoiceEnabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">👋</Badge>
                      <span className="text-sm">Gesture Control</span>
                    </div>
                    <Badge variant={isGestureEnabled ? "default" : "secondary"}>
                      {isGestureEnabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Badge variant="outline">🦽</Badge>
                    <span className="text-sm">Wheelchair Accessible Routes</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Badge variant="outline">🔊</Badge>
                    <span className="text-sm">Audio Navigation Guidance</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Badge variant="outline">🌐</Badge>
                    <span className="text-sm">Multi-language Support</span>
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
                    Building Map - {floors[selectedFloor]}
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
                {/* Floor Selector */}
                <div className="flex space-x-2 mb-4">
                  {floors.map((floor, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={selectedFloor === index ? "default" : "outline"}
                      onClick={() => setSelectedFloor(index)}
                    >
                      {floor}
                    </Button>
                  ))}
                </div>

                <div className="relative rounded-lg p-4 h-96 bg-gray-50">
                  {/* Building Map Background */}
                  <div 
                    className="absolute inset-4 bg-center bg-contain bg-no-repeat rounded"
                    style={{
                      backgroundImage: `url(/lovable-uploads/9dbed0bd-eaeb-444d-804b-0adbb4f486c3.png)`
                    }}
                  >
                    {/* Location markers for current floor */}
                    {currentFloorLocations.map((location) => (
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
                    {isNavigating && selectedLocation && selectedLocation.floorLevel === selectedFloor && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path
                          d={`M 62 82 Q 65 75 ${selectedLocation.coordinates.x} ${selectedLocation.coordinates.y}`}
                          stroke="#22c55e"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="8,4"
                          className="animate-pulse"
                        />
                      </svg>
                    )}

                    {/* You are here marker (only on ground floor) */}
                    {selectedFloor === 0 && (
                      <div 
                        className="absolute w-5 h-5 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 ring-4 ring-green-200 border-2 border-white"
                        style={{ left: '62%', top: '82%' }}
                        title="You are here"
                      />
                    )}
                  </div>
                  
                  {/* Enhanced Legend */}
                  <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg border shadow-sm">
                    <div className="text-xs font-medium mb-3">Legend</div>
                    <div className="space-y-2 text-xs">
                      {selectedFloor === 0 && (
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 ring-2 ring-green-200"></div>
                          <span>Your Location</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>Available Rooms</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span>Navigation Target</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-1 bg-green-500 mr-2 opacity-75"></div>
                        <span>Navigation Path</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="text-xs text-muted-foreground">
                          Floor: {floors[selectedFloor]}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rooms: {currentFloorLocations.length}
                        </div>
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
                    {selectedLocation.floorLevel !== 0 && (
                      <p className="text-xs text-blue-600 mt-1">
                        Take elevator to {selectedLocation.floor}
                      </p>
                    )}
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
