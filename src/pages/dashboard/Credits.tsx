import React, { useState } from 'react';
import { useCredits } from "@/contexts/CreditsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Coins, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Credits = () => {
  const { credits, refreshCredits } = useCredits();
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");

  const handleAddCredits = async () => {
    try {
      const { error } = await supabase
        .from('creditos')
        .update({ 
          quantidade: (credits ?? 0) + Number(amount)
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      await refreshCredits();
      toast({
        title: "Créditos adicionados",
        description: `${amount} créditos foram adicionados à sua conta.`
      });
      setAmount("");
    } catch (error) {
      console.error('Error adding credits:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar os créditos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Créditos</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Seus Créditos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{credits ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">créditos disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Adicionar Créditos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                type="number"
                placeholder="Quantidade de créditos"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
              />
              <Button 
                onClick={handleAddCredits}
                disabled={!amount || Number(amount) <= 0}
              >
                Adicionar
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Digite a quantidade de créditos que deseja adicionar
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Credits;
