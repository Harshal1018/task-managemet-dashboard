
import React from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Task } from "./TaskList";

interface TaskProgressFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (taskId: string, progress: number) => void;
  task: Task;
}

const TaskProgressForm: React.FC<TaskProgressFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  task,
}) => {
  const form = useForm({
    defaultValues: {
      progress: task.progress,
    },
  });

  const handleSubmit = (values: { progress: number }) => {
    onSubmit(task.id, values.progress);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Update Task Progress</DialogTitle>
          <DialogDescription>
            Update your progress on "{task.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 space-y-1">
            <h4 className="text-sm font-medium">Task Details</h4>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            
            {task.deadline && (
              <p className="text-sm">
                <span className="font-medium">Deadline:</span> {format(task.deadline, 'PPP')}
              </p>
            )}
            
            {task.daysToComplete && (
              <p className="text-sm">
                <span className="font-medium">Estimated days:</span> {task.daysToComplete}
              </p>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="progress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Progress: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        max={100}
                        step={5}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Slide to update your task progress
                    </FormDescription>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Progress
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskProgressForm;
