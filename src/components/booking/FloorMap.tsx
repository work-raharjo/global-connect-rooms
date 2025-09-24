
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Room {
  id: number;
  name: string;
  capacity: number;
  floor: string;
  available: boolean;
  position: string;
}

interface FloorMapProps {
  rooms: Room[];
  onRoomSelect: (roomId: number) => void;
  selectedRoom: number | null;
}

export const FloorMap: React.FC<FloorMapProps> = ({ rooms, onRoomSelect, selectedRoom }) => {
  const getRoomByPosition = (position: string) => {
    return rooms.find(room => room.position === position);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ninth Floor Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[650px]">
          <iframe 
            title="Mappedin Map" 
            name="Mappedin Map" 
            allow="clipboard-write 'self' https://app.mappedin.com; web-share 'self' https://app.mappedin.com" 
            scrolling="no" 
            width="100%" 
            height="650" 
            frameBorder="0" 
            style={{border: 0}} 
            src="https://app.mappedin.com/map/68d395df4d3a29000b77a50b?embedded=true"
          />
        </div>
      </CardContent>
    </Card>
  );
};
