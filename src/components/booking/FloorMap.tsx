
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
        <div className="relative bg-gray-50 rounded-lg p-8 min-h-[300px]">
          {/* Current Location Marker */}
          <div className="absolute top-4 left-4">
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              You Are Here
            </div>
          </div>

          {/* Room Grid Layout */}
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Top Row */}
            <div className="space-y-2">
              {/* Skyline Room */}
              <div 
                className={`bg-green-200 rounded-lg p-4 cursor-pointer border-2 transition-all ${
                  selectedRoom === 1 ? 'border-blue-500 bg-green-300' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => onRoomSelect(1)}
              >
                <div className="text-center font-medium text-gray-800">
                  {getRoomByPosition('top-left')?.name}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {/* Marina Room */}
              <div 
                className={`bg-green-200 rounded-lg p-4 cursor-pointer border-2 transition-all ${
                  selectedRoom === 2 ? 'border-blue-500 bg-green-300' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => onRoomSelect(2)}
              >
                <div className="text-center font-medium text-gray-800">
                  {getRoomByPosition('top-right')?.name}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="space-y-2">
              {/* Garden Room */}
              <div 
                className={`bg-green-200 rounded-lg p-4 cursor-pointer border-2 transition-all ${
                  selectedRoom === 3 ? 'border-blue-500 bg-green-300' : 'border-transparent hover:border-gray-300'
                } ${!getRoomByPosition('bottom-left')?.available ? 'opacity-60' : ''}`}
                onClick={() => onRoomSelect(3)}
              >
                <div className="text-center font-medium text-gray-800">
                  {getRoomByPosition('bottom-left')?.name}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {/* Summit Room */}
              <div 
                className={`bg-green-200 rounded-lg p-4 cursor-pointer border-2 transition-all ${
                  selectedRoom === 4 ? 'border-blue-500 bg-green-300' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => onRoomSelect(4)}
              >
                <div className="text-center font-medium text-gray-800">
                  {getRoomByPosition('bottom-right')?.name}
                </div>
              </div>
            </div>
          </div>

          {/* Additional floor elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded"></div>
          <div className="absolute top-8 right-8 w-8 h-16 bg-gray-300 rounded"></div>
          <div className="absolute bottom-8 right-8 w-8 h-16 bg-gray-300 rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
};
