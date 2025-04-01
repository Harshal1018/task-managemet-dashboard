
import React, { useState } from "react";
import { Search, Filter, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import TaskCard from "./TaskCard";
import { format, isAfter } from "date-fns";

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  category: string;
  progress: number;
  deadline?: Date;
  daysToComplete?: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  showDeadlines?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, showDeadlines = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories
  const categories = Array.from(new Set(tasks.map((task) => task.category)));

  // Filter tasks by search query and selected categories
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(task.category);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== category)
                    );
                  }
                }}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => {
            const taskExtraContent = showDeadlines && task.deadline ? (
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  Deadline: {format(task.deadline, 'MMM d, yyyy')}
                  {isAfter(new Date(), task.deadline) && (
                    <span className="text-destructive ml-1">(Overdue)</span>
                  )}
                </span>
              </div>
            ) : undefined;
            
            return (
              <TaskCard
                key={task.id}
                {...task}
                onClick={() => onTaskClick && onTaskClick(task.id)}
                extraContent={taskExtraContent}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
