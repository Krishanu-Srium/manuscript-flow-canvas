
import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "writer" | "editor" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setDemoUser: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo purposes
const demoUsers: Record<UserRole, User> = {
  writer: {
    id: "w1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "writer",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  editor: {
    id: "e1",
    name: "Mark Davis",
    email: "mark@example.com",
    role: "editor",
    avatar: "https://i.pravatar.cc/150?img=61"
  },
  admin: {
    id: "a1",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=48"
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    // This would be replaced by actual authentication logic
    console.log("Login attempt with", email, password);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo, set as writer
    setUser(demoUsers.writer);
  };

  const logout = () => {
    setUser(null);
  };
  
  const setDemoUser = (role: UserRole) => {
    setUser(demoUsers[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        setDemoUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
