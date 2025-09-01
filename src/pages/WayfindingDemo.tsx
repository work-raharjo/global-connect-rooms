
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

                {/* Interactive Map Container */}
                <div className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gradient-to-br from-blue-50 to-green-50 h-[500px] overflow-hidden">
                  {/* Grid Pattern Background */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Floor Plan Layout */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    {/* Building Structure */}
                    <rect x="10" y="20" width="80" height="60" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" rx="2"/>
                    
                    {/* Corridors */}
                    <rect x="10" y="45" width="80" height="10" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.2"/>
                    <rect x="45" y="20" width="10" height="60" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.2"/>
                    
                    {/* Elevators */}
                    <rect x="47" y="47" width="6" height="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.3" rx="1"/>
                    <text x="50" y="51" fontSize="2" textAnchor="middle" fill="#92400e">ELV</text>
                    
                    {/* Emergency Exits */}
                    <rect x="10" y="30" width="3" height="6" fill="#ef4444" rx="0.5"/>
                    <rect x="87" y="30" width="3" height="6" fill="#ef4444" rx="0.5"/>
                    <text x="11.5" y="33.5" fontSize="1.5" textAnchor="middle" fill="white">EXIT</text>
                    <text x="88.5" y="33.5" fontSize="1.5" textAnchor="middle" fill="white">EXIT</text>
                    
                    {/* Stairs */}
                    <rect x="15" y="47" width="6" height="6" fill="#6366f1" stroke="#4f46e5" strokeWidth="0.3" rx="1"/>
                    <text x="18" y="50.5" fontSize="1.8" textAnchor="middle" fill="white">🪜</text>
                    
                    <rect x="79" y="47" width="6" height="6" fill="#6366f1" stroke="#4f46e5" strokeWidth="0.3" rx="1"/>
                    <text x="82" y="50.5" fontSize="1.8" textAnchor="middle" fill="white">🪜</text>
                    
                    {/* Restrooms */}
                    <rect x="25" y="47" width="4" height="6" fill="#8b5cf6" rx="0.5"/>
                    <text x="27" y="50.5" fontSize="1.5" textAnchor="middle" fill="white">WC</text>
                    
                    <rect x="71" y="47" width="4" height="6" fill="#8b5cf6" rx="0.5"/>
                    <text x="73" y="50.5" fontSize="1.5" textAnchor="middle" fill="white">WC</text>
                  </svg>
                  
                  {/* Location Markers with Enhanced Visuals */}
                  {currentFloorLocations.map((location) => (
                    <div key={location.id} className="absolute group">
                      <div
                        className={`w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer border-2 border-white shadow-lg ${
                          selectedDestination === location.id 
                            ? 'bg-red-500 ring-4 ring-red-200 animate-pulse scale-150 z-20' 
                            : 'bg-blue-600 hover:bg-blue-700 hover:scale-125 z-10'
                        }`}
                        style={{
                          left: `${location.coordinates.x}%`,
                          top: `${location.coordinates.y}%`
                        }}
                        onClick={() => handleStartNavigation(location.id)}
                      />
                      
                      {/* Room Label Tooltip */}
                      <div 
                        className="absolute bg-white px-2 py-1 rounded-md shadow-lg border text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30"
                        style={{
                          left: `${location.coordinates.x}%`,
                          top: `${location.coordinates.y - 8}%`,
                          transform: 'translate(-50%, -100%)'
                        }}
                      >
                        <div className="text-gray-900">{location.name}</div>
                        <div className="text-gray-600 text-xs">{location.section}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45"></div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Enhanced Navigation Path */}
                  {isNavigating && selectedLocation && selectedLocation.floorLevel === selectedFloor && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
                      {/* Animated path with waypoints */}
                      <path
                        d={`M 50 85 L 50 55 L ${selectedLocation.coordinates.x} 55 L ${selectedLocation.coordinates.x} ${selectedLocation.coordinates.y}`}
                        stroke="#22c55e"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="10,5"
                        className="animate-pulse drop-shadow-sm"
                      />
                      
                      {/* Direction arrows along path */}
                      <polygon points="49,70 51,70 50,67" fill="#22c55e" className="animate-pulse"/>
                      <polygon points={`${selectedLocation.coordinates.x-1},${selectedLocation.coordinates.y+3} ${selectedLocation.coordinates.x+1},${selectedLocation.coordinates.y+3} ${selectedLocation.coordinates.x},${selectedLocation.coordinates.y}`} fill="#22c55e" className="animate-pulse"/>
                      
                      {/* Walking direction indicator */}
                      <circle cx="50" cy="75" r="3" fill="#22c55e" className="animate-ping"/>
                    </svg>
                  )}

                  {/* Enhanced "You Are Here" Marker */}
                  {selectedFloor === 0 && (
                    <div className="absolute z-20" style={{ left: '50%', top: '85%', transform: 'translate(-50%, -50%)' }}>
                      <div className="relative">
                        <div className="w-6 h-6 bg-green-500 rounded-full ring-4 ring-green-200 border-3 border-white animate-pulse shadow-lg"></div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                          You are here
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Accessibility Features Overlay */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {selectedFloor === 0 && (
                      <Badge variant="outline" className="bg-white/90 backdrop-blur">
                        <span className="mr-1">♿</span> Ground Floor Access
                      </Badge>
                    )}
                    {currentFloorLocations.some(loc => loc.section.includes('Meeting') || loc.section.includes('Conference')) && (
                      <Badge variant="outline" className="bg-white/90 backdrop-blur">
                        <span className="mr-1">📹</span> Video Conferencing Available
                      </Badge>
                    )}
                  </div>
                  
                  {/* Enhanced Legend */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-4 rounded-lg border shadow-lg max-w-xs">
                    <div className="text-sm font-semibold mb-3 text-gray-900">Navigation Guide</div>
                    <div className="space-y-2 text-xs">
                      {selectedFloor === 0 && (
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 ring-2 ring-green-200 animate-pulse"></div>
                          <span className="text-gray-700">Your Current Location</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mr-2 border border-white shadow"></div>
                        <span className="text-gray-700">Available Destinations ({currentFloorLocations.length})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2 ring-2 ring-red-200"></div>
                        <span className="text-gray-700">Navigation Target</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-1 bg-green-500 mr-2 opacity-75 rounded"></div>
                        <span className="text-gray-700">Walking Route</span>
                      </div>
                      
                      <div className="border-t pt-2 mt-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Current Floor:</span>
                          <Badge variant="secondary" className="text-xs">{floors[selectedFloor]}</Badge>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                          <span className="text-gray-600 text-xs">Elevators</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-indigo-600 rounded mr-2"></div>
                          <span className="text-gray-600 text-xs">Stairs</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                          <span className="text-gray-600 text-xs">Emergency Exits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Controls */}
                  <div className="absolute top-4 right-4 space-x-2">
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur" onClick={() => setSelectedDestination(null)}>
                      Clear Route
                    </Button>
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
