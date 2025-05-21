
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { motion } from "framer-motion";

import { useResume } from "@/contexts/ResumeContext";
import { Template } from "@/types";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { createResumeSchema } from "@/lib/validations";
import ResumeEditor from "@/components/resume/ResumeEditor";
import ResumePreview from "@/components/resume/ResumePreview";
import { FilePlus, Copy, ArrowLeft, Loader2 } from "lucide-react";

// Expanded default sections to include the new categories
const defaultSections = [
  { id: "personalInfo", name: "Informações Pessoais", type: "personalInfo" },
  { id: "objective", name: "Objetivo Profissional", type: "objective" },
  { id: "experience", name: "Experiência Profissional", type: "experience" },
  { id: "education", name: "Formação Acadêmica", type: "education" },
  { id: "skills", name: "Habilidades", type: "skills" },
  { id: "certifications", name: "Certificações", type: "certifications" },
  { id: "links", name: "Links", type: "links" },
  // Technical categories
  { id: "technicalSkills", name: "Habilidades Técnicas", type: "technicalSkills" },
  { id: "extendedCertifications", name: "Certificações Detalhadas", type: "extendedCertifications" },
  // Add more sections as needed
];

const EditResume = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resumes, currentResume, loadResume, updateResume, updateResumeTemplate } = useResume();
  const [sections, setSections] = useState(defaultSections);
  const [resumeData, setResumeData] = useState(currentResume?.data || null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const form = useForm({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      title: currentResume?.title || "",
      template: (currentResume?.template as Template) || "modern",
    }
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load resume data when component mounts
  useEffect(() => {
    const fetchResumeData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          await loadResume(id);
          setIsLoading(false);
        } catch (error) {
          console.error("Error loading resume:", error);
          toast.error("Erro ao carregar currículo");
          navigate("/dashboard");
        }
      }
    };

    fetchResumeData();
  }, [id, loadResume, navigate]);

  // Update local state when currentResume changes
  useEffect(() => {
    if (currentResume) {
      setResumeData(currentResume.data);
      form.reset({
        title: currentResume.title,
        template: currentResume.template as Template,
      });
    }
  }, [currentResume, form]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUpdateResumeData = (type: keyof typeof resumeData, data: any) => {
    if (!resumeData) return;
    
    setResumeData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [type]: data,
      };
    });
  };

  const handleSave = async (values: { title: string; template: Template }) => {
    if (!currentResume || !resumeData) return;
    
    setIsSaving(true);
    try {
      // Update resume template if changed
      if (values.template !== currentResume.template) {
        await updateResumeTemplate(currentResume.id, values.template);
      }
      
      // Update resume title and data
      await updateResume(currentResume.id, resumeData);
      
      toast.success("Currículo atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating resume:", error);
      toast.error("Erro ao atualizar currículo");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDuplicate = async () => {
    if (!currentResume || !resumeData) return;
    
    setIsDuplicating(true);
    try {
      // Logic to duplicate the resume will be implemented in the future
      toast.success("Funcionalidade de duplicação será implementada em breve!");
    } catch (error) {
      console.error("Error duplicating resume:", error);
      toast.error("Erro ao duplicar currículo");
    } finally {
      setIsDuplicating(false);
    }
  };

  if (isLoading || !resumeData) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Carregando currículo...</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container px-4 py-6 space-y-8"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Editar Currículo</h1>
            <p className="text-muted-foreground">Faça alterações no seu currículo e salve quando terminar.</p>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Currículo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Currículo para Desenvolvedor Frontend"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Template</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Update the preview immediately
                        if (currentResume) {
                          updateResumeTemplate(currentResume.id, value as Template);
                        }
                      }}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="modern" className="sr-only" />
                          </FormControl>
                          <div className="border-2 rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center gap-2">
                            <div className="h-20 w-full bg-resume-modern-primary rounded"></div>
                            <span className="text-sm">Moderno</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="classic" className="sr-only" />
                          </FormControl>
                          <div className="border-2 rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center gap-2">
                            <div className="h-20 w-full bg-resume-classic-primary rounded"></div>
                            <span className="text-sm">Clássico</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="minimal" className="sr-only" />
                          </FormControl>
                          <div className="border-2 rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center gap-2">
                            <div className="h-20 w-full bg-resume-minimal-primary rounded"></div>
                            <span className="text-sm">Minimalista</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Separator />
          
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[600px] rounded-lg border"
          >
            <ResizablePanel defaultSize={50} minSize={30}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <ResumeEditor
                  sections={sections}
                  resumeData={resumeData}
                  updateResumeData={handleUpdateResumeData}
                />
              </DndContext>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              <ResumePreview
                resumeData={resumeData}
                template={form.watch("template") as Template}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
          
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleDuplicate}
              disabled={isDuplicating}
            >
              {isDuplicating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Duplicando...
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar Currículo
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </Button>
              
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default EditResume;
