
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, isSameDay, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  category: string;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (eventId: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onDateSelect,
  onEventClick,
}) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handlePreviousMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  const handleDaySelect = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
    if (selectedDate && onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  // Get events for selected date
  const dayEvents = selectedDate
    ? events.filter((event) => isSameDay(event.date, selectedDate))
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
      <Card className="md:col-span-1">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Calendar</CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
            month={date}
            className="rounded-md border"
            components={{
              DayContent: ({ day }) => {
                const hasEvents = events.some((event) => isSameDay(event.date, day));
                return (
                  <div className="relative flex h-9 w-9 items-center justify-center">
                    <span
                      className={cn(
                        isToday(day) && "bg-primary text-primary-foreground",
                        hasEvents && !isToday(day) && "font-medium",
                        isSameDay(day, selectedDate) && !isToday(day) && "bg-accent"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    {hasEvents && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </div>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dayEvents.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No events for this day
            </div>
          ) : (
            <div className="space-y-2">
              {dayEvents.map((event) => {
                const categoryColors: Record<string, string> = {
                  "Work": "border-blue-300 bg-blue-50",
                  "Personal": "border-green-300 bg-green-50",
                  "Study": "border-indigo-300 bg-indigo-50",
                  "Health": "border-red-300 bg-red-50",
                  "Home": "border-yellow-300 bg-yellow-50",
                  "Other": "border-gray-300 bg-gray-50",
                };

                const colorClass = categoryColors[event.category] || categoryColors.Other;

                return (
                  <div
                    key={event.id}
                    className={`p-3 rounded-md border ${colorClass} cursor-pointer hover:shadow-sm transition-shadow`}
                    onClick={() => onEventClick && onEventClick(event.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{event.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(event.date, "h:mm a")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
