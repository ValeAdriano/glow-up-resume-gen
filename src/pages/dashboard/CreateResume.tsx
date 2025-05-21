import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { useResume } from "@/contexts/ResumeContext";
import { Template } from "@/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { createResumeSchema } from "@/lib/validations";
import { FilePlus, ArrowLeft } from "lucide-react";

const CreateResume = () => {
  const navigate = useNavigate();
  const { createResume } = useResume();
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      title: "",
      template: "modern",
    }
  });

  const handleCreate = async (values: { title: string; template: Template }) => {
    setIsCreating(true);
    try {
      await createResume(values.title, values.template);
      toast.success("Currículo criado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating resume:", error);
      toast.error("Erro ao criar currículo");
    } finally {
      setIsCreating(false);
    }
  };

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
            <h1 className="text-3xl font-bold tracking-tight">Criar Currículo</h1>
            <p className="text-muted-foreground">Preencha os campos abaixo para criar um novo currículo.</p>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-8">
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
          
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? (
                <>
                  Criando...
                </>
              ) : (
                <>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Criar Currículo
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default CreateResume;
