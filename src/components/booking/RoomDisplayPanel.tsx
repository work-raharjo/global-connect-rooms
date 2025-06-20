
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, QrCode, Video } from "lucide-react";
import { useTTS } from './TTSProvider';

interface Meeting {
  id: number;
  title: string;
  time: string;
  duration: string;
  attendees: number;
  platform?: 'zoom' | 'teams' | 'webex';
}

interface RoomDisplayPanelProps {
  roomName: string;
  isOccupied: boolean;
  capacity: number;
  currentMeeting?: Meeting;
  upcomingMeetings: Meeting[];
}

export const RoomDisplayPanel: React.FC<RoomDisplayPanelProps> = ({
  roomName,
  isOccupied,
  capacity,
  currentMeeting,
  upcomingMeetings
}) => {
  const { speak } = useTTS();
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Announce room status when component mounts or status changes
    const statusText = isOccupied 
      ? `${roomName} is currently occupied` 
      : `${roomName} is available`;
    speak(statusText);
  }, [isOccupied, roomName, speak]);

  const handleQuickBook = () => {
    speak("Quick booking initiated");
    // Implement quick booking logic
  };

  const handleCheckIn = () => {
    speak("Check-in successful");
    // Implement check-in logic
  };

  const handleJoinMeeting = (platform: string) => {
    speak(`Joining ${platform} meeting`);
    // Auto-join meeting logic
  };

  return (
    <div className={`h-screen p-6 transition-colors duration-500 ${
      isOccupied ? 'bg-red-50' : 'bg-green-50'
    }`}>
      {/* Room Status Header */}
      <div className={`text-center mb-8 p-6 rounded-lg ${
        isOccupied ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      }`}>
        <h1 className="text-4xl font-bold mb-2">{roomName}</h1>
        <p className="text-2xl">
          {isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
        </p>
        <p className="text-lg opacity-90">Capacity: {capacity} people</p>
      </div>

      {/* Current Meeting */}
      {currentMeeting && (
        <Card className="mb-6 border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Meeting</span>
              {currentMeeting.platform && (
                <Button 
                  onClick={() => handleJoinMeeting(currentMeeting.platform!)}
                  className="flex items-center gap-2"
                >
                  <Video className="h-4 w-4" />
                  Join {currentMeeting.platform}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">{currentMeeting.title}</h3>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{currentMeeting.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{currentMeeting.attendees} attendees</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Schedule */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{meeting.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {meeting.time} • {meeting.duration}
                  </p>
                </div>
                <Badge variant="outline">
                  {meeting.attendees} people
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          size="lg" 
          onClick={handleQuickBook}
          disabled={isOccupied}
          className="h-16 text-lg"
        >
          Quick Book 30min
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          onClick={() => setShowQR(!showQR)}
          className="h-16 text-lg"
        >
          <QrCode className="mr-2 h-6 w-6" />
          Check-in QR
        </Button>
      </div>

      {/* QR Code Display */}
      {showQR && (
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="h-32 w-32 text-gray-400" />
            </div>
            <p className="text-lg font-medium">Scan to Check-in</p>
            <p className="text-sm text-muted-foreground">
              Use your phone to check into this meeting room
            </p>
          </CardContent>
        </Card>
      )}

      {/* Visual Status Indicator */}
      <div className={`fixed top-0 left-0 w-full h-2 ${
        isOccupied ? 'bg-red-500' : 'bg-green-500'
      }`} />
    </div>
  );
};
