
import React, { useEffect, useState } from "react";
import { PlusCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskSummary from "@/components/Dashboard/TaskSummary";
import WeeklyProgress from "@/components/Dashboard/WeeklyProgress";
import TaskList from "@/components/Task/TaskList";
import TaskForm from "@/components/Task/TaskForm";
import TaskProgressForm from "@/components/Task/TaskProgressForm";
import { Task } from "@/components/Task/TaskList";
import { TaskService } from "@/services/taskService";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, upcoming: 0 });
  const [weeklyData, setWeeklyData] = useState([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isProgressFormOpen, setIsProgressFormOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tasks and statistics
    const fetchData = async () => {
      try {
        const tasksData = await TaskService.getTasks();
        const incompleteTasksData = await TaskService.getIncompleteTasks();
        const statsData = await TaskService.getTasksStats();
        const weeklyData = await TaskService.getWeeklyProgress();
        
        setTasks(tasksData);
        setIncompleteTasks(incompleteTasksData);
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
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsProgressFormOpen(true);
    }
  };

  const handleCreateTask = async (values: any) => {
    try {
      await TaskService.createTask(values);
      
      // Refetch data to update the UI
      const tasksData = await TaskService.getTasks();
      const incompleteTasksData = await TaskService.getIncompleteTasks();
      const statsData = await TaskService.getTasksStats();
      
      setTasks(tasksData);
      setIncompleteTasks(incompleteTasksData);
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

  const handleUpdateProgress = async (taskId: string, progress: number) => {
    try {
      await TaskService.updateProgress(taskId, progress);
      
      // Refetch data to update the UI
      const tasksData = await TaskService.getTasks();
      const incompleteTasksData = await TaskService.getIncompleteTasks();
      const statsData = await TaskService.getTasksStats();
      
      setTasks(tasksData);
      setIncompleteTasks(incompleteTasksData);
      setStats(statsData);
      
      toast({
        title: "Progress Updated",
        description: "Your task progress has been updated successfully!",
      });
    } catch (error) {
      console.error("Error updating progress:", error);
      toast({
        title: "Error updating progress",
        description: "Could not update your task progress. Please try again.",
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

      {incompleteTasks.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex justify-between items-center">
              <span>Tasks Requiring Attention</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs gap-1"
                onClick={() => navigate('/tasks')}
              >
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskList 
              tasks={incompleteTasks.slice(0, 3)} 
              onTaskClick={handleTaskClick}
              showDeadlines={true}
            />
          </CardContent>
        </Card>
      )}

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

      {selectedTask && (
        <TaskProgressForm
          open={isProgressFormOpen}
          onOpenChange={setIsProgressFormOpen}
          onSubmit={handleUpdateProgress}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
