
import React from "react";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import ProgressRing from "@/components/ProgressRing";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  category: string;
  progress: number;
  onClick?: () => void;
  extraContent?: React.ReactNode;
}

const getCategoryColor = (category: string) => {
  const categories: Record<string, string> = {
    "Work": "bg-blue-100 text-blue-800",
    "Personal": "bg-green-100 text-green-800",
    "Study": "bg-indigo-100 text-indigo-800",
    "Health": "bg-red-100 text-red-800",
    "Home": "bg-yellow-100 text-yellow-800",
    "Other": "bg-gray-100 text-gray-800",
  };

  return categories[category] || categories.Other;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  date,
  time,
  category,
  progress,
  onClick,
  extraContent,
}) => {
  return (
    <div 
      className="task-card cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-medium text-base line-clamp-1">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {description}
            </p>
          )}
        </div>
        <ProgressRing progress={progress} size={40} strokeWidth={3} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={cn("category-badge", getCategoryColor(category))}>
          {category}
        </span>
        
        <div className="flex items-center text-muted-foreground text-xs ml-auto">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{format(date, "MMM dd")}</span>
        </div>
        
        {time && (
          <div className="flex items-center text-muted-foreground text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{time}</span>
          </div>
        )}
      </div>
      
      {extraContent}
    </div>
  );
};

export default TaskCard;
