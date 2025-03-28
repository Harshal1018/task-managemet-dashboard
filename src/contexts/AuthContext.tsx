
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  signup: (userData: User) => void;
  logout: () => void;
  hasSignedUpBefore: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasSignedUpBefore, setHasSignedUpBefore] = useState<boolean>(false);

  // Load stored user and signup state on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const signedUpBefore = localStorage.getItem('hasSignedUpBefore');
    if (signedUpBefore === 'true') {
      setHasSignedUpBefore(true);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signup = (userData: User) => {
    // Mark that user has signed up before
    setHasSignedUpBefore(true);
    localStorage.setItem('hasSignedUpBefore', 'true');
    
    // In a real app, we'd store the user in a database
    // For now, we'll just set the user in state
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Note: we don't remove the hasSignedUpBefore flag on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, hasSignedUpBefore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
