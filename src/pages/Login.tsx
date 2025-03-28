
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const { toast } = useToast();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    // Simulate login - in a real app, this would validate against a backend
    login({ 
      name: username, 
      email: `${username.toLowerCase().replace(/\s+/g, '.')}@example.com` 
    });
    
    setShowAnimation(true);
    
    toast({
      title: "Login successful",
      description: "Welcome back to Purple Task Trove!",
    });
    
    // Wait for animation to complete before redirecting
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  // If already logged in, redirect to dashboard
  if (user && !showAnimation) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className={`w-full max-w-md ${showAnimation ? 'animate-fade-out' : 'animate-fade-in'}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Purple Task Trove</h1>
          <p className="text-muted-foreground mt-2">Welcome! Sign in to your account</p>
        </div>
        
        <Card className="overflow-hidden shadow-md transform transition-all duration-500" 
              style={{
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                opacity: mounted ? 1 : 0,
                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
              }}>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
              </div>

              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
