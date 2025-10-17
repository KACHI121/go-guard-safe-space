import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'tourist' | 'driver' | 'institution';

interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  register: (email: string, password: string, name: string, userType: UserType) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('goguard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: UserType) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      userType,
    };
    setUser(mockUser);
    localStorage.setItem('goguard_user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string, name: string, userType: UserType) => {
    // Mock registration - in real app, this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      userType,
    };
    setUser(mockUser);
    localStorage.setItem('goguard_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('goguard_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
