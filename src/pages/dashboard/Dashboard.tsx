
import { useState } from "react";
import { Link } from "react-router-dom";
import { useResume } from "../../contexts/ResumeContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { FilePlus, FileText, Trash2, Edit, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Template } from "../../types";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

const Dashboard = () => {
  const { resumes, deleteResume, currentResume, loadResume } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setDeletingId(id);
    try {
      await deleteResume(id);
      toast.success("Currículo excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Erro ao excluir currículo. Tente novamente.");
    } finally {
      setIsLoading(false);
      setDeletingId(null);
    }
  };

  const getTemplateLabel = (template: Template): string => {
    switch (template) {
      case "modern":
        return "Moderno";
      case "classic":
        return "Clássico";
      case "minimal":
        return "Minimalista";
      default:
        return template;
    }
  };

  const handleDownloadPDF = async (resume: React.MouseEvent, id: string) => {
    resume.preventDefault();
    resume.stopPropagation();
    
    try {
      setIsLoading(true);
      await loadResume(id);
      
      if (currentResume) {
        toast.info("Preparando PDF para download...");
        
        // Create a temporary div to render the resume
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '210mm';
        tempDiv.style.minHeight = '297mm';
        document.body.appendChild(tempDiv);
        
        const opt = {
          margin: 10,
          filename: `curriculo-${currentResume.data.personalInfo.fullName || 'sem-nome'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(tempDiv).save().then(() => {
          document.body.removeChild(tempDiv);
          toast.success("PDF gerado com sucesso!");
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meus Currículos</h1>
        <Button asChild className="transition-transform hover:scale-105">
          <Link to="/dashboard/create">
            <FilePlus className="mr-2 h-4 w-4" />
            Novo Currículo
          </Link>
        </Button>
      </div>

      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle>{resume.title}</CardTitle>
                <CardDescription>
                  {getTemplateLabel(resume.template)} • Atualizado{" "}
                  {formatDistanceToNow(new Date(resume.updatedAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <Link to={`/dashboard/edit/${resume.id}`} className="block">
                  <div className="resume-paper h-40 w-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                    <FileText className="h-10 w-10 text-muted-foreground/60" />
                  </div>
                </Link>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" asChild className="transition-transform hover:scale-105">
                  <Link to={`/dashboard/edit/${resume.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => handleDownloadPDF(e, resume.id)}
                    disabled={isLoading}
                    className="transition-transform hover:scale-105"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="transition-transform hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="animate-fade-in-up">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir currículo?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Isso excluirá permanentemente seu currículo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(resume.id)}
                          disabled={isLoading && deletingId === resume.id}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          {isLoading && deletingId === resume.id ? "Excluindo..." : "Excluir"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-72 bg-muted/40 rounded-lg border-2 border-dashed animate-fade-in">
          <FileText className="h-12 w-12 text-muted-foreground/60 mb-4" />
          <h2 className="text-xl font-medium">Nenhum currículo encontrado</h2>
          <p className="text-muted-foreground mt-1">
            Você ainda não criou nenhum currículo
          </p>
          <Button className="mt-6 transition-transform hover:scale-105" asChild>
            <Link to="/dashboard/create">
              <FilePlus className="mr-2 h-4 w-4" />
              Criar meu primeiro currículo
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
