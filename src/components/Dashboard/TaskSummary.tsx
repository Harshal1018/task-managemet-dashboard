
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface TaskSummaryProps {
  completedTasks: number;
  inProgressTasks: number;
  upcomingTasks: number;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({
  completedTasks,
  inProgressTasks,
  upcomingTasks,
}) => {
  const summaryItems = [
    {
      title: "Completed",
      value: completedTasks,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
    },
    {
      title: "Upcoming",
      value: upcomingTasks,
      icon: <AlertCircle className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
      {summaryItems.map((item, index) => (
        <Card 
          key={index} 
          className={`border ${item.color} transition-all hover:shadow-md`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-md font-medium">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.title === "Completed"
                ? "tasks completed"
                : item.title === "In Progress"
                ? "tasks in progress"
                : "upcoming tasks"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskSummary;
