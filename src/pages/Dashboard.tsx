
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskSummary from "@/components/Dashboard/TaskSummary";
import WeeklyProgress from "@/components/Dashboard/WeeklyProgress";
import TaskList from "@/components/Task/TaskList";
import TaskForm from "@/components/Task/TaskForm";
import { TaskService } from "@/services/taskService";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, upcoming: 0 });
  const [weeklyData, setWeeklyData] = useState([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch tasks and statistics
    const fetchData = async () => {
      try {
        const tasksData = await TaskService.getTasks();
        const statsData = await TaskService.getTasksStats();
        const weeklyData = await TaskService.getWeeklyProgress();
        
        setTasks(tasksData);
        setStats(statsData);
        setWeeklyData(weeklyData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error fetching data",
          description: "Could not load your tasks. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleTaskClick = (taskId: string) => {
    // Navigate to task details or open edit modal
    console.log("Task clicked:", taskId);
  };

  const handleCreateTask = async (values: any) => {
    try {
      await TaskService.createTask(values);
      
      // Refetch data to update the UI
      const tasksData = await TaskService.getTasks();
      const statsData = await TaskService.getTasksStats();
      
      setTasks(tasksData);
      setStats(statsData);
      
      toast({
        title: "Task Created",
        description: "Your task has been created successfully!",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error creating task",
        description: "Could not create your task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your tasks and track your progress
          </p>
        </div>
        <Button 
          onClick={() => setIsTaskFormOpen(true)}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <TaskSummary
        completedTasks={stats.completed}
        inProgressTasks={stats.inProgress}
        upcomingTasks={stats.upcoming}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyProgress data={weeklyData} />
        
        <div className="bg-card border rounded-lg p-4 animate-fade-in shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => (
                <div 
                  key={task.id}
                  className="p-3 bg-accent/50 rounded-md cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{task.title}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {task.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No tasks available
            </p>
          )}
        </div>
      </div>

      <TaskForm
        open={isTaskFormOpen}
        onOpenChange={setIsTaskFormOpen}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default Dashboard;
