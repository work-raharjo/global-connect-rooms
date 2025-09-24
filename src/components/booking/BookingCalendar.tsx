
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ selectedDate, onDateSelect }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = currentDate.getDate();
  const selectedDay = selectedDate.getDate();
  
  // Generate calendar days for current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = [];
  
  // Add empty cells for days before the month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-lg">{currentMonth}</CardTitle>
          <Button variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <Button
                  variant={day === selectedDay ? "default" : "ghost"}
                  size="sm"
                  className={`w-full h-full ${day === today ? 'ring-2 ring-primary' : ''} ${day === selectedDay ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => {
                    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    onDateSelect(newDate);
                  }}
                >
                  {day}
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
