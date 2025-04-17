
import { useState } from "react";
import { Link } from "react-router-dom";
import { useResume } from "../../contexts/ResumeContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { FilePlus, FileText, Trash2, Edit, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Template } from "../../types";
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
  const { resumes, deleteResume } = useResume();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteResume(id);
    } catch (error) {
      console.error("Error deleting resume:", error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meus Currículos</h1>
        <Button asChild>
          <Link to="/dashboard/create">
            <FilePlus className="mr-2 h-4 w-4" />
            Novo Currículo
          </Link>
        </Button>
      </div>

      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden card-hover">
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
                <div className="resume-paper h-40 w-full bg-muted flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/60" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/dashboard/edit/${resume.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
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
                          disabled={isLoading}
                        >
                          {isLoading ? "Excluindo..." : "Excluir"}
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
        <div className="flex flex-col items-center justify-center h-72 bg-muted/40 rounded-lg border-2 border-dashed">
          <FileText className="h-12 w-12 text-muted-foreground/60 mb-4" />
          <h2 className="text-xl font-medium">Nenhum currículo encontrado</h2>
          <p className="text-muted-foreground mt-1">
            Você ainda não criou nenhum currículo
          </p>
          <Button className="mt-6" asChild>
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
