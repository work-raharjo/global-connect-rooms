import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Users, MapPin, Settings, Volume2, Hand } from "lucide-react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { FloorMap } from "@/components/booking/FloorMap";
import { RoomList } from "@/components/booking/RoomList";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { UpcomingBookings } from "@/components/booking/UpcomingBookings";
import { DashboardSearch } from "@/components/booking/DashboardSearch";
import { RoomDisplayPanel } from "@/components/booking/RoomDisplayPanel";
import { TTSProvider, useTTS } from "@/components/booking/TTSProvider";
import { GestureControlProvider, useGestureControlContext } from "@/components/booking/GestureControlProvider";
const rooms = [{
  id: 1,
  name: "Innovation Hub",
  capacity: 15,
  floor: "9th Floor",
  available: true,
  position: "top-left",
  features: ["Projector", "Video Conference"]
}, {
  id: 2,
  name: "Collaboration Space",
  capacity: 10,
  floor: "9th Floor",
  available: true,
  position: "top-right",
  features: ["Whiteboard", "TV Display"]
}, {
  id: 3,
  name: "Focus Room",
  capacity: 6,
  floor: "9th Floor",
  available: false,
  position: "bottom-left",
  features: ["Video Conference"]
}, {
  id: 4,
  name: "Executive Suite",
  capacity: 20,
  floor: "9th Floor",
  available: true,
  position: "bottom-right",
  features: ["Projector", "Video Conference", "Whiteboard"]
}];
const upcomingBookings = [{
  id: 1,
  time: "10:00 - 11:30",
  title: "Product Strategy Meeting",
  room: "Innovation Hub",
  date: "Today"
}, {
  id: 2,
  time: "14:00 - 15:00",
  title: "Team Standup",
  room: "Collaboration Space",
  date: "Today"
}];
const mockCurrentMeeting = {
  id: 1,
  title: "Product Strategy Meeting",
  time: "10:00 - 11:30",
  duration: "1h 30m",
  attendees: 8,
  platform: 'zoom' as const
};
const mockUpcomingMeetings = [{
  id: 2,
  title: "Team Standup",
  time: "14:00 - 15:00",
  duration: "1h",
  attendees: 5
}, {
  id: 3,
  title: "Client Presentation",
  time: "16:00 - 17:00",
  duration: "1h",
  attendees: 12,
  platform: 'teams' as const
}];
const RoomBookingContent = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'display'>('dashboard');
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const {
    speak,
    isEnabled: ttsEnabled,
    toggleTTS
  } = useTTS();
  const {
    isGestureEnabled,
    toggleGesture,
    gestureData,
    isActive
  } = useGestureControlContext();
  const handleRoomSelect = (roomId: number) => {
    setSelectedRoom(roomId);
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      speak(`Selected ${room.name}, capacity ${room.capacity} people`);
    }
  };
  const handleSearch = (query: string, filters: any) => {
    let filtered = rooms;
    if (query) {
      filtered = filtered.filter(room => room.name.toLowerCase().includes(query.toLowerCase()) || room.floor.toLowerCase().includes(query.toLowerCase()) || room.features.some(feature => feature.toLowerCase().includes(query.toLowerCase())));
    }
    if (filters.capacity) {
      filtered = filtered.filter(room => room.capacity >= filters.capacity);
    }
    if (filters.location) {
      filtered = filtered.filter(room => room.floor === filters.location);
    }
    if (filters.availability === 'available') {
      filtered = filtered.filter(room => room.available);
    }
    if (filters.features.length > 0) {
      filtered = filtered.filter(room => filters.features.some((feature: string) => room.features.includes(feature)));
    }
    setFilteredRooms(filtered);
    speak(`Found ${filtered.length} matching rooms`);
  };
  if (viewMode === 'display' && selectedRoom) {
    const room = rooms.find(r => r.id === selectedRoom);
    if (room) {
      return <RoomDisplayPanel roomName={room.name} isOccupied={!room.available} capacity={room.capacity} currentMeeting={!room.available ? mockCurrentMeeting : undefined} upcomingMeetings={mockUpcomingMeetings} />;
    }
  }
  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Smart Room Booking System</h1>
              <p className="text-muted-foreground">UNDP Meeting Room Management</p>
            </div>
            <div className="flex gap-2">
              <Button variant={ttsEnabled ? "default" : "outline"} size="sm" onClick={toggleTTS}>
                <Volume2 className="h-4 w-4 mr-1" />
                TTS {ttsEnabled ? 'On' : 'Off'}
              </Button>
              <Button variant={isGestureEnabled ? "default" : "outline"} size="sm" onClick={toggleGesture}>
                <Hand className="h-4 w-4 mr-1" />
                Gesture {isGestureEnabled ? 'On' : 'Off'}
              </Button>
              
              
            </div>
          </div>

          {/* Gesture Status Indicator */}
          {isGestureEnabled && <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  Gesture Control Active {isActive ? '(Detecting)' : ''}
                </span>
                {gestureData && <Badge variant="outline" className="text-blue-700">
                    {gestureData}
                  </Badge>}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Swipe up: Navigate • Swipe left/right: Change menu • Swipe down: Go back
              </p>
            </div>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Search and Floor Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Search */}
            <DashboardSearch onSearch={handleSearch} />

            {/* Location Selection */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg">UNDP Headquarters - 9th Floor</span>
                  </div>
                  <Badge variant="outline">4 Rooms Available</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Floor Map */}
            <FloorMap rooms={filteredRooms} onRoomSelect={handleRoomSelect} selectedRoom={selectedRoom} />

            {/* Room List */}
            <RoomList rooms={filteredRooms} onRoomSelect={handleRoomSelect} />
          </div>

          {/* Right Column - Calendar and Bookings */}
          <div className="space-y-6">
            <BookingCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            <UpcomingBookings bookings={upcomingBookings} />
            
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Outlook Sync</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Poly Integration</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Occupancy Sensors</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Uptime</span>
                    <Badge variant="outline">99.8%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
const RoomBookingSystem = () => {
  return <TTSProvider>
      <GestureControlProvider>
        <RoomBookingContent />
      </GestureControlProvider>
    </TTSProvider>;
};
export default RoomBookingSystem;