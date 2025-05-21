
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Credits } from "@/types";

interface CreditsContextType {
  credits: number | null;
  loading: boolean;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider = ({ children }: { children: React.ReactNode }) => {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <CreditsContext.Provider value={{ credits, loading }}>
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
