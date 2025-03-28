
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressData {
  name: string;
  completed: number;
}

interface WeeklyProgressProps {
  data: ProgressData[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-border rounded-md shadow-sm">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-sm text-primary">{`${payload[0].value} tasks`}</p>
      </div>
    );
  }

  return null;
};

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ data }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Your task completion over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgress;
