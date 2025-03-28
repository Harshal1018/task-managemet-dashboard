
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendarView, { CalendarEvent } from "@/components/Calendar/CalendarView";
import TaskForm from "@/components/Task/TaskForm";
import { TaskService } from "@/services/taskService";
import { useToast } from "@/components/ui/use-toast";

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await TaskService.getTasks();
        
        // Convert tasks to calendar events
        const calendarEvents: CalendarEvent[] = tasksData.map((task) => ({
          id: task.id,
          title: task.title,
          date: task.date,
          category: task.category,
        }));
        
        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Could not load calendar events. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchTasks();
  }, [toast]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = async (eventId: string) => {
    try {
      const task = await TaskService.getTaskById(eventId);
      if (task) {
        setSelectedTask(task);
        setIsTaskFormOpen(true);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleCreateTask = async (values: any) => {
    try {
      if (selectedTask) {
        // Update existing task
        await TaskService.updateTask(selectedTask.id, values);
        toast({
          title: "Task Updated",
          description: "Your task has been updated successfully!",
        });
      } else {
        // Create new task with pre-selected date
        await TaskService.createTask({
          ...values,
          date: selectedDate || new Date(),
        });
        toast({
          title: "Task Created",
          description: "Your task has been created successfully!",
        });
      }
      
      // Refetch tasks to update the UI
      const tasksData = await TaskService.getTasks();
      const calendarEvents: CalendarEvent[] = tasksData.map((task) => ({
        id: task.id,
        title: task.title,
        date: task.date,
        category: task.category,
      }));
      
      setEvents(calendarEvents);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error creating/updating task:", error);
      toast({
        title: "Error",
        description: "Could not save your task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFormClose = () => {
    setIsTaskFormOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            View your tasks in a calendar view
          </p>
        </div>
        <Button 
          onClick={() => {
            setSelectedTask(null);
            setIsTaskFormOpen(true);
          }}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <CalendarView 
        events={events} 
        onDateSelect={handleDateSelect} 
        onEventClick={handleEventClick} 
      />

      <TaskForm
        open={isTaskFormOpen}
        onOpenChange={handleFormClose}
        onSubmit={handleCreateTask}
        initialValues={selectedTask || {
          date: selectedDate || new Date(),
        }}
      />
    </div>
  );
};

export default CalendarPage;
