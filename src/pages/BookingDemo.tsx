
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

const rooms = [
  { id: 1, name: "Conference Room A", capacity: 12, floor: "2nd Floor", available: true, equipment: ["Projector", "Video Conf", "Whiteboard"] },
  { id: 2, name: "Meeting Room B", capacity: 6, floor: "3rd Floor", available: false, equipment: ["TV Screen", "Phone"] },
  { id: 3, name: "Collaboration Hub", capacity: 8, floor: "1st Floor", available: true, equipment: ["Interactive Display", "Video Conf"] },
  { id: 4, name: "Executive Suite", capacity: 4, floor: "4th Floor", available: true, equipment: ["Premium Audio", "Video Conf", "Catering"] },
  { id: 5, name: "Workshop Space", capacity: 20, floor: "1st Floor", available: true, equipment: ["Movable Tables", "Projector", "Sound System"] },
  { id: 6, name: "Focus Room C", capacity: 4, floor: "2nd Floor", available: false, equipment: ["Quiet Zone", "Screen"] }
];

const BookingDemo = () => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState<'select' | 'details' | 'confirmed'>('select');
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    startTime: '',
    endTime: '',
    attendees: '',
    purpose: ''
  });

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoom(roomId);
    setBookingStep('details');
  };

  const handleBookingSubmit = () => {
    setBookingStep('confirmed');
    setTimeout(() => {
      setBookingStep('select');
      setSelectedRoom(null);
      setBookingDetails({ date: '', startTime: '', endTime: '', attendees: '', purpose: '' });
    }, 3000);
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  if (bookingStep === 'confirmed') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground">
                Your meeting room has been successfully reserved.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{selectedRoomData?.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{selectedRoomData?.floor}</p>
                <p className="text-sm text-muted-foreground">
                  {bookingDetails.date} • {bookingDetails.startTime} - {bookingDetails.endTime}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-2">Room Booking Demo</h1>
          <p className="text-muted-foreground">Experience effortless meeting room reservations</p>
        </div>

        {bookingStep === 'select' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room.id} className={`cursor-pointer transition-all hover:shadow-md ${!room.available ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {room.floor}
                      </p>
                    </div>
                    <Badge variant={room.available ? "default" : "secondary"}>
                      {room.available ? "Available" : "Occupied"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Users className="h-4 w-4 mr-1" />
                    Up to {room.capacity} people
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {room.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={!room.available}
                    onClick={() => handleRoomSelect(room.id)}
                  >
                    {room.available ? "Book Room" : "Unavailable"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {bookingStep === 'details' && selectedRoomData && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Book {selectedRoomData.name}</CardTitle>
                <p className="text-muted-foreground">{selectedRoomData.floor} • Up to {selectedRoomData.capacity} people</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={bookingDetails.date}
                      onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="attendees">Number of Attendees</Label>
                    <Input 
                      id="attendees" 
                      type="number" 
                      placeholder="e.g., 6"
                      value={bookingDetails.attendees}
                      onChange={(e) => setBookingDetails({...bookingDetails, attendees: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input 
                      id="startTime" 
                      type="time"
                      value={bookingDetails.startTime}
                      onChange={(e) => setBookingDetails({...bookingDetails, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input 
                      id="endTime" 
                      type="time"
                      value={bookingDetails.endTime}
                      onChange={(e) => setBookingDetails({...bookingDetails, endTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="purpose">Meeting Purpose</Label>
                  <Input 
                    id="purpose" 
                    placeholder="e.g., Weekly team standup"
                    value={bookingDetails.purpose}
                    onChange={(e) => setBookingDetails({...bookingDetails, purpose: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setBookingStep('select')} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleBookingSubmit} className="flex-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDemo;
