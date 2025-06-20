
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface Booking {
  id: number;
  time: string;
  title: string;
  room: string;
  date: string;
}

interface UpcomingBookingsProps {
  bookings: Booking[];
}

export const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ bookings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{booking.time}</span>
            </div>
            <div>
              <h4 className="font-medium">{booking.title}</h4>
              <p className="text-sm text-muted-foreground">{booking.room}</p>
            </div>
            <Button variant="link" className="p-0 h-auto text-blue-500">
              View Details
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
