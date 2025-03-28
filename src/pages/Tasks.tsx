
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskList, { Task } from "@/components/Task/TaskList";
import TaskForm from "@/components/Task/TaskForm";
import { TaskService } from "@/services/taskService";
import { useToast } from "@/components/ui/use-toast";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await TaskService.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Could not load tasks. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchTasks();
  }, [toast]);

  const handleTaskClick = async (taskId: string) => {
    try {
      const task = await TaskService.getTaskById(taskId);
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
        // Create new task
        await TaskService.createTask(values);
        toast({
          title: "Task Created",
          description: "Your task has been created successfully!",
        });
      }
      
      // Refetch tasks to update the UI
      const tasksData = await TaskService.getTasks();
      setTasks(tasksData);
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
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            View and manage all your tasks
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

      <TaskList tasks={tasks} onTaskClick={handleTaskClick} />

      <TaskForm
        open={isTaskFormOpen}
        onOpenChange={handleFormClose}
        onSubmit={handleCreateTask}
        initialValues={selectedTask || undefined}
      />
    </div>
  );
};

export default Tasks;
