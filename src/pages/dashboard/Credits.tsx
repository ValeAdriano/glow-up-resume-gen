
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAddCredits = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para adicionar créditos.",
        variant: "destructive",
      });
      return;
    }

    // Validate input before proceeding
    const creditAmount = Number(amount);
    if (isNaN(creditAmount) || creditAmount <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma quantidade válida de créditos.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Adding credits:", {
        userId: user.id,
        currentCredits: credits,
        amountToAdd: creditAmount
      });
      
      // Check if a record exists for this user
      const { data: existingRecord, error: checkError } = await supabase
        .from('creditos')
        .select('quantidade')
        .eq('user_id', user.id)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows found"
        throw checkError;
      }
      
      let result;
      
      if (!existingRecord) {
        // No record exists, insert a new one
        result = await supabase
          .from('creditos')
          .insert({ 
            user_id: user.id,
            quantidade: creditAmount 
          });
      } else {
        // Record exists, update it
        result = await supabase
          .from('creditos')
          .update({ 
            quantidade: (existingRecord.quantidade || 0) + creditAmount
          })
          .eq('user_id', user.id);
      }
      
      if (result.error) throw result.error;

      await refreshCredits();
      toast({
        title: "Créditos adicionados",
        description: `${creditAmount} créditos foram adicionados à sua conta.`
      });
      setAmount("");
    } catch (error) {
      console.error('Error adding credits:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar os créditos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
                disabled={isSubmitting || !user || !amount || Number(amount) <= 0}
              >
                {isSubmitting ? "Adicionando..." : "Adicionar"}
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
