
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Room {
  id: number;
  name: string;
  capacity: number;
  floor: string;
  available: boolean;
  position: string;
}

interface RoomListProps {
  rooms: Room[];
  onRoomSelect: (roomId: number) => void;
}

export const RoomList: React.FC<RoomListProps> = ({ rooms, onRoomSelect }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Meeting Rooms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">{room.name}</h3>
                <span className="text-sm text-muted-foreground">({room.capacity})</span>
                <Badge variant={room.available ? "default" : "secondary"}>
                  {room.available ? "Available" : "Occupied"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Cap. {room.capacity}</span>
              <Button 
                disabled={!room.available}
                onClick={() => onRoomSelect(room.id)}
                className="min-w-[80px]"
              >
                {room.available ? "Book" : "Occupied"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
