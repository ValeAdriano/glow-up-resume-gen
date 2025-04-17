
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { toast } from "sonner";
import { createResumeSchema } from "@/lib/validations";
import { useResume } from "@/contexts/ResumeContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Template, ResumeData } from "@/types";
import ResumeEditor from "@/components/resume/ResumeEditor";
import ResumePreview from "@/components/resume/ResumePreview";
import { Separator } from "@/components/ui/separator";
import { FilePlus, Copy, Save, Loader2, ArrowLeft } from "lucide-react";

import type { z } from "zod";

type FormValues = z.infer<typeof createResumeSchema>;

const defaultSections = [
  { id: "personalInfo", name: "Informações Pessoais", type: "personalInfo" },
  { id: "objective", name: "Objetivo Profissional", type: "objective" },
  { id: "experience", name: "Experiência Profissional", type: "experience" },
  { id: "education", name: "Formação Acadêmica", type: "education" },
  { id: "skills", name: "Habilidades", type: "skills" },
  { id: "certifications", name: "Certificações", type: "certifications" },
  { id: "links", name: "Links", type: "links" },
];

const EditResume = () => {
  const { id } = useParams<{ id: string }>();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [sections, setSections] = useState(defaultSections);
  const [submitting, setSubmitting] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const { loadResume, currentResume, updateResume, createResume } = useResume();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      title: "",
      template: "modern",
    },
  });

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;
      
      try {
        await loadResume(id);
      } catch (error) {
        console.error("Error loading resume:", error);
        toast.error("Erro ao carregar currículo");
        navigate("/dashboard");
      }
    };

    fetchResume();
  }, [id, loadResume, navigate]);

  useEffect(() => {
    if (currentResume) {
      form.reset({
        title: currentResume.title,
        template: currentResume.template,
      });
      setResumeData(currentResume.data);
    }
  }, [currentResume, form]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateResumeData = (type: keyof ResumeData, data: any) => {
    setResumeData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [type]: data,
      };
    });
  };

  const handleSave = async () => {
    if (!currentResume || !resumeData) return;
    
    try {
      setSubmitting(true);
      const values = form.getValues();
      
      await updateResume(currentResume.id, resumeData);
      await updateResumeTemplate(currentResume.id, values.template as Template);
      
      toast.success("Currículo atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating resume:", error);
      toast.error("Erro ao atualizar currículo. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDuplicate = async () => {
    if (!currentResume || !resumeData) return;
    
    try {
      setDuplicating(true);
      const values = form.getValues();
      
      await createResume(`${values.title} (Cópia)`, values.template as Template);
      
      toast.success("Currículo duplicado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error duplicating resume:", error);
      toast.error("Erro ao duplicar currículo. Tente novamente.");
    } finally {
      setDuplicating(false);
    }
  };

  const updateResumeTemplate = async (id: string, template: Template) => {
    // Use the updateResumeTemplate function from the context
    // This is just a placeholder for now
  };

  if (!resumeData || !currentResume) {
    return (
      <div className="container px-4 py-6 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium">Carregando currículo...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="group"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Currículo</h1>
          <p className="text-muted-foreground">
            Atualize as informações do seu currículo.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Currículo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Currículo para Desenvolvedor Frontend" {...field} />
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
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="modern" className="sr-only" />
                          </FormControl>
                          <div className="border-2 rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center gap-2 transition-colors duration-200">
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
                          <div className="border-2 rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center gap-2 transition-colors duration-200">
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
                          <div className="border-2 rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center gap-2 transition-colors duration-200">
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
          
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
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
                  updateResumeData={updateResumeData}
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
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="transition-transform hover:scale-105"
            >
              Cancelar
            </Button>
            
            <Button 
              type="button" 
              variant="secondary"
              onClick={handleDuplicate}
              disabled={duplicating}
              className="transition-transform hover:scale-105"
            >
              {duplicating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Duplicando...
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar
                </>
              )}
            </Button>
            
            <Button 
              type="button" 
              onClick={handleSave}
              disabled={submitting}
              className="transition-transform hover:scale-105"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditResume;
