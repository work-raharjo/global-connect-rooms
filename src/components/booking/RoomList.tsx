
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Monitor, Video, Presentation, Tv } from "lucide-react";

interface Room {
  id: number;
  name: string;
  capacity: number;
  floor: string;
  available: boolean;
  position: string;
  features?: string[];
}

interface RoomListProps {
  rooms: Room[];
  onRoomSelect: (roomId: number) => void;
}

const getFeatureIcon = (feature: string) => {
  switch (feature) {
    case 'Projector':
      return <Presentation className="h-3 w-3" />;
    case 'Video Conference':
      return <Video className="h-3 w-3" />;
    case 'Whiteboard':
      return <Monitor className="h-3 w-3" />;
    case 'TV Display':
      return <Tv className="h-3 w-3" />;
    default:
      return null;
  }
};

export const RoomList: React.FC<RoomListProps> = ({ rooms, onRoomSelect }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Available Meeting Rooms
          <Badge variant="outline">{rooms.filter(r => r.available).length} Available</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-lg">{room.name}</h3>
                  <Badge variant={room.available ? "default" : "secondary"}>
                    {room.available ? "Available" : "Occupied"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Up to {room.capacity} people</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{room.floor}</span>
                  </div>
                </div>
              </div>
              <Button 
                disabled={!room.available}
                onClick={() => onRoomSelect(room.id)}
                className="min-w-[100px]"
                size="lg"
              >
                {room.available ? "Book Now" : "Occupied"}
              </Button>
            </div>
            
            {/* Room Features */}
            {room.features && room.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {room.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {getFeatureIcon(feature)}
                    <span className="ml-1">{feature}</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {rooms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No rooms found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
