
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Navigation, Search, Zap, Mic, MicOff, Hand } from "lucide-react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

// Updated locations to match the 4-floor building structure
const locations = [
  // Ground Floor
  { id: 1, name: "Main Reception", floor: "Ground Floor", section: "Entrance", coordinates: { x: 50, y: 85 }, floorLevel: 0 },
  { id: 2, name: "Security Desk", floor: "Ground Floor", section: "Lobby", coordinates: { x: 35, y: 80 }, floorLevel: 0 },
  { id: 3, name: "Cafeteria", floor: "Ground Floor", section: "West Wing", coordinates: { x: 20, y: 75 }, floorLevel: 0 },
  
  // First Floor
  { id: 4, name: "Conference Room A", floor: "1st Floor", section: "East Wing", coordinates: { x: 75, y: 65 }, floorLevel: 1 },
  { id: 5, name: "Collaboration Hub", floor: "1st Floor", section: "Central", coordinates: { x: 50, y: 65 }, floorLevel: 1 },
  { id: 6, name: "Meeting Room B", floor: "1st Floor", section: "West Wing", coordinates: { x: 25, y: 65 }, floorLevel: 1 },
  
  // Second Floor
  { id: 7, name: "Library", floor: "2nd Floor", section: "Quiet Zone", coordinates: { x: 70, y: 45 }, floorLevel: 2 },
  { id: 8, name: "Study Rooms", floor: "2nd Floor", section: "Central", coordinates: { x: 50, y: 45 }, floorLevel: 2 },
  { id: 9, name: "Training Room", floor: "2nd Floor", section: "West Wing", coordinates: { x: 30, y: 45 }, floorLevel: 2 },
  
  // Third Floor
  { id: 10, name: "Executive Suite", floor: "3rd Floor", section: "North Wing", coordinates: { x: 50, y: 25 }, floorLevel: 3 },
  { id: 11, name: "Board Room", floor: "3rd Floor", section: "East Wing", coordinates: { x: 75, y: 25 }, floorLevel: 3 },
  { id: 12, name: "IT Support", floor: "3rd Floor", section: "West Wing", coordinates: { x: 25, y: 25 }, floorLevel: 3 }
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {floors.map((floor, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={selectedFloor === index ? "default" : "outline"}
                      onClick={() => setSelectedFloor(index)}
                      className="relative"
                    >
                      {floor}
                      <Badge variant="secondary" className="ml-2 h-4 text-xs">
                        {locations.filter(loc => loc.floorLevel === index).length}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* Interactive Mappedin Wayfinding */}
                <div className="relative rounded-lg border bg-card overflow-hidden">
                  <iframe 
                    title="Mappedin Map" 
                    name="Mappedin Map"
                    allow="clipboard-write 'self' https://app.mappedin.com; web-share 'self' https://app.mappedin.com" 
                    scrolling="no" 
                    width="100%" 
                    height="650" 
                    frameBorder="0" 
                    style={{ border: 0 }}
                    src="https://app.mappedin.com/map/68d395df4d3a29000b77a50b?embedded=true"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WayfindingDemo;
