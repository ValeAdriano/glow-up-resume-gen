
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Credits } from "@/types";
import { useAuth } from "./AuthContext";

interface CreditsContextType {
  credits: number | null;
  loading: boolean;
  checkCredit: () => Promise<boolean>;
  refreshCredits: () => Promise<void>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider = ({ children }: { children: React.ReactNode }) => {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCredits = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('creditos')
        .select('quantidade')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setCredits(data.quantidade);
    } catch (error: any) {
      console.error('Error fetching credits:', error);
      toast({
        title: "Erro ao carregar créditos",
        description: "Não foi possível carregar seus créditos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkCredit = async (): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const { data, error } = await supabase
        .rpc('consume_credit', { user_uuid: user.id });

      if (error) throw error;
      
      await refreshCredits();
      return data;
    } catch (error: any) {
      console.error('Error checking credit:', error);
      return false;
    }
  };

  const refreshCredits = async () => {
    await fetchCredits();
  };

  useEffect(() => {
    if (user) {
      fetchCredits();
    } else {
      setCredits(null);
    }
  }, [user]);

  return (
    <CreditsContext.Provider value={{ credits, loading, checkCredit, refreshCredits }}>
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
