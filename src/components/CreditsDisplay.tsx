
import { useCredits } from "@/contexts/CreditsContext";
import { Coins } from "lucide-react";

export const CreditsDisplay = () => {
  const { credits, loading } = useCredits();

  if (loading) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Coins className="h-4 w-4" />
      <span>Créditos: {credits ?? 0}</span>
    </div>
  );
};
