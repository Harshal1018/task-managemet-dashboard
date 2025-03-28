
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Facebook, Twitter, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface SignupFormProps {
  onSuccess: () => void;
}

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>();
  const { toast } = useToast();
  const { signup } = useAuth();

  const onSubmit = (data: SignupFormValues) => {
    console.log("Signup data:", data);
    // In a real app, this would make an API call
    // For now, we'll just simulate success
    signup({ 
      name: data.name, 
      email: data.email 
    });
    
    toast({
      title: "Account created",
      description: "Welcome to Purple Task Trove!",
    });
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
        <p className="text-sm text-muted-foreground">Enter your details to sign up</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Enter your name"
              className="pl-10"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signupPassword">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signupPassword"
              type="password"
              placeholder="Create a password"
              className="pl-10"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" type="button" className="rounded-full">
          <Facebook className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" type="button" className="rounded-full">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" type="button" className="rounded-full">
          <Github className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
