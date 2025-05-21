
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface CreditsContextType {
  credits: number | null;
  loading: boolean;
  refreshCredits: () => Promise<void>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider = ({ children }: { children: React.ReactNode }) => {
  const [credits, setCredits] = useState<number | null>(10); // Default demo credits
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // This function would normally fetch credits from a database
  const refreshCredits = async () => {
    setLoading(true);
    try {
      // In a real app with Supabase, this would fetch the credits
      // For now, we're just setting a demo value
      setCredits(credits => (credits || 10) + 1);
    } catch (error) {
      console.error("Error refreshing credits:", error);
      toast({
        title: "Error",
        description: "Could not refresh credits.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreditsContext.Provider value={{ credits, loading, refreshCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};
