
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { ResumeData, Template } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Eye } from "lucide-react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import { toast } from "sonner";

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
}

const ResumePreview = ({ resumeData, template }: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} />;
      case "classic":
        return <ClassicTemplate resumeData={resumeData} />;
      case "minimal":
        return <MinimalTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    toast.info("Preparando PDF para download...");

    const element = resumeRef.current;
    const opt = {
      margin: 10,
      filename: `curriculo-${resumeData.personalInfo.fullName || 'sem-nome'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      toast.success("PDF gerado com sucesso!");
    }).catch((error) => {
      console.error("Error generating PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-muted/50 border-b flex items-center justify-between">
        <div>
          <h3 className="font-medium text-sm">Visualização</h3>
          <p className="text-xs text-muted-foreground">Template: {template.charAt(0).toUpperCase() + template.slice(1)}</p>
        </div>
        <Button 
          size="sm" 
          onClick={handleDownloadPDF}
          variant="outline"
          className="transition-all hover:scale-105 hover:shadow-sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Baixar PDF
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-8 flex justify-center">
          <div 
            ref={resumeRef}
            className="w-[210mm] min-h-[297mm] bg-white shadow-lg transition-transform duration-300"
          >
            {renderTemplate()}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResumePreview;
