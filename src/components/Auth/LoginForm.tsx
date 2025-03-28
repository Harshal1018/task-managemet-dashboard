
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onSuccess: () => void;
}

interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const { toast } = useToast();
  const { login } = useAuth();

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // In a real app, this would make an API call
    // For now, we'll just simulate success
    login({ 
      name: data.username, 
      email: `${data.username.toLowerCase().replace(/\s+/g, '.')}@example.com` 
    });
    
    toast({
      title: "Login successful",
      description: "Welcome back to Purple Task Trove!",
    });
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">Enter your credentials to sign in</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              placeholder="Enter your username"
              className="pl-10"
              {...register("username", { required: "Username is required" })}
            />
          </div>
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="px-0 font-normal text-xs h-auto" type="button">
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
          <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
        </div>

        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
