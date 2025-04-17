import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { createResumeSchema } from "@/lib/validations";
import { useResume } from "@/contexts/ResumeContext";
import { useCredits } from "@/contexts/CreditsContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Template, ResumeData } from "@/types";
import ResumeEditor from "@/components/resume/ResumeEditor";
import ResumePreview from "@/components/resume/ResumePreview";
import { Separator } from "@/components/ui/separator";
import { FilePlus, Loader2 } from "lucide-react";

import type { z } from "zod";

type FormValues = z.infer<typeof createResumeSchema>;

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
  },
  objective: "",
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  links: [],
};

const defaultSections = [
  { id: "personalInfo", name: "Informações Pessoais", type: "personalInfo" },
  { id: "objective", name: "Objetivo Profissional", type: "objective" },
  { id: "experience", name: "Experiência Profissional", type: "experience" },
  { id: "education", name: "Formação Acadêmica", type: "education" },
  { id: "skills", name: "Habilidades", type: "skills" },
  { id: "certifications", name: "Certificações", type: "certifications" },
  { id: "links", name: "Links", type: "links" },
];

const CreateResume = () => {
  const { checkCredit } = useCredits();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [sections, setSections] = useState(defaultSections);
  const [submitting, setSubmitting] = useState(false);
  const { createResume } = useResume();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      title: "",
      template: "modern",
    },
  });

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
    setResumeData((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      
      // Check if user has credits
      const hasCredits = await checkCredit();
      if (!hasCredits) {
        toast.error("Créditos insuficientes", {
          description: "Você precisa comprar mais créditos para criar um novo currículo."
        });
        // TODO: Navigate to credits purchase page when implemented
        return;
      }
      
      // Create the resume
      await createResume(values.title, values.template);
      
      toast.success("Currículo criado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating resume:", error);
      toast.error("Erro ao criar currículo. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container px-4 py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Currículo</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para criar seu currículo personalizado.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Salvar Currículo
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateResume;
