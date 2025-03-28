
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSuccess = () => {
    // In a real app, this would involve authentication
    // For now, we'll just navigate to the dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Purple Task Trove</h1>
          <p className="text-muted-foreground mt-2">Manage your tasks with ease</p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="overflow-hidden transform transition-all duration-500 shadow-md" 
                style={{
                  transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: mounted ? 1 : 0,
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                }}>
            <CardContent className="p-6">
              <LoginForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden shadow-md">
            <CardContent className="p-6">
              <SignupForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
