
import { Task } from "@/components/Task/TaskList";

// Mock data for initial development
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Finish the draft and send it to the client for review.",
    date: new Date(2023, 6, 15),
    time: "14:00",
    category: "Work",
    progress: 75,
  },
  {
    id: "2",
    title: "Gym Workout",
    description: "30 minutes cardio and strength training.",
    date: new Date(2023, 6, 16),
    time: "06:30",
    category: "Health",
    progress: 100,
  },
  {
    id: "3",
    title: "Read Book",
    description: "Continue reading chapter 5 of 'Atomic Habits'.",
    date: new Date(2023, 6, 17),
    time: "20:00",
    category: "Personal",
    progress: 30,
  },
  {
    id: "4",
    title: "Doctor Appointment",
    description: "Annual check-up at City Hospital.",
    date: new Date(2023, 6, 18),
    time: "10:15",
    category: "Health",
    progress: 0,
  },
  {
    id: "5",
    title: "Team Meeting",
    description: "Weekly sprint planning with the development team.",
    date: new Date(2023, 6, 19),
    time: "09:00",
    category: "Work",
    progress: 0,
  },
  {
    id: "6",
    title: "Grocery Shopping",
    description: "Buy fruits, vegetables, and other essentials.",
    date: new Date(2023, 6, 20),
    time: "17:30",
    category: "Home",
    progress: 50,
  },
];

// In a real application, these would interact with an API
export const TaskService = {
  // Get all tasks
  getTasks: (): Promise<Task[]> => {
    return Promise.resolve(mockTasks);
  },

  // Get task by ID
  getTaskById: (id: string): Promise<Task | undefined> => {
    const task = mockTasks.find((task) => task.id === id);
    return Promise.resolve(task);
  },

  // Create a new task
  createTask: (task: Omit<Task, "id" | "progress">): Promise<Task> => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      progress: 0,
    };
    mockTasks.push(newTask);
    return Promise.resolve(newTask);
  },

  // Update a task
  updateTask: (id: string, updates: Partial<Task>): Promise<Task | undefined> => {
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      mockTasks[index] = { ...mockTasks[index], ...updates };
      return Promise.resolve(mockTasks[index]);
    }
    return Promise.resolve(undefined);
  },

  // Update task progress
  updateProgress: (id: string, progress: number): Promise<Task | undefined> => {
    return TaskService.updateTask(id, { progress });
  },

  // Delete a task
  deleteTask: (id: string): Promise<boolean> => {
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      mockTasks.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },

  // Get tasks by category
  getTasksByCategory: (category: string): Promise<Task[]> => {
    const tasks = mockTasks.filter((task) => task.category === category);
    return Promise.resolve(tasks);
  },

  // Get tasks statistics
  getTasksStats: (): Promise<{
    completed: number;
    inProgress: number;
    upcoming: number;
  }> => {
    const completed = mockTasks.filter((task) => task.progress === 100).length;
    const inProgress = mockTasks.filter(
      (task) => task.progress > 0 && task.progress < 100
    ).length;
    const upcoming = mockTasks.filter((task) => task.progress === 0).length;

    return Promise.resolve({
      completed,
      inProgress,
      upcoming,
    });
  },

  // Get weekly progress data
  getWeeklyProgress: (): Promise<{ name: string; completed: number }[]> => {
    // This would normally fetch from a backend API
    // Mocking weekly data for now
    return Promise.resolve([
      { name: "Mon", completed: 3 },
      { name: "Tue", completed: 5 },
      { name: "Wed", completed: 2 },
      { name: "Thu", completed: 4 },
      { name: "Fri", completed: 6 },
      { name: "Sat", completed: 3 },
      { name: "Sun", completed: 1 },
    ]);
  },
};
