
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define a simple User type since we removed it from types
interface User {
  id?: string;
  email: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Since we're removing Supabase, we'll implement these as stub functions
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would validate credentials
      setUser({ 
        id: "demo-user-id",
        email,
        fullName: "Demo User" 
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      // In a real app, this would create a new account
      setUser({
        id: "demo-user-id",
        email,
        fullName
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // In a real app, this would sign the user out
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      signIn,
      signUp,
      signOut
    }}>
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
