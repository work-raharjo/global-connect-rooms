
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Users, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { FloorMap } from "@/components/booking/FloorMap";
import { RoomList } from "@/components/booking/RoomList";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { UpcomingBookings } from "@/components/booking/UpcomingBookings";

const rooms = [
  { id: 1, name: "Skyline Room", capacity: 15, floor: "9th Floor", available: true, position: "top-left" },
  { id: 2, name: "Marina Room", capacity: 10, floor: "9th Floor", available: true, position: "top-right" },
  { id: 3, name: "Garden Room", capacity: 6, floor: "9th Floor", available: false, position: "bottom-left" },
  { id: 4, name: "Summit Room", capacity: 20, floor: "9th Floor", available: true, position: "bottom-right" }
];

const upcomingBookings = [
  {
    id: 1,
    time: "10:00 - 11:30",
    title: "Product Strategy Meeting",
    room: "Skyline Room",
    date: "Today"
  },
  {
    id: 2,
    time: "14:00 - 15:00",
    title: "Team Standup",
    room: "Marina Room",
    date: "Today"
  }
];

const RoomBookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoom(roomId);
  };

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
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Meeting Room Booking</h1>
              <p className="text-muted-foreground">SmartSpace Solutions</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Book a Room</Button>
              <Button variant="outline">My Bookings</Button>
              <Button variant="outline">Room Schedule</Button>
              <Button variant="outline">Log out</Button>
              <Button>Log</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Location Selection and Floor Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Selection */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg">Select a location</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <span className="text-muted-foreground">›</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Floor Map */}
            <FloorMap rooms={rooms} onRoomSelect={handleRoomSelect} selectedRoom={selectedRoom} />

            {/* Room List */}
            <RoomList rooms={rooms} onRoomSelect={handleRoomSelect} />
          </div>

          {/* Right Column - Calendar and Upcoming Bookings */}
          <div className="space-y-6">
            <BookingCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            <UpcomingBookings bookings={upcomingBookings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBookingSystem;
