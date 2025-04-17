
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { personalInfoSchema, educationSchema, experienceSchema, skillSchema, certificationSchema, linkSchema } from "@/lib/validations";
import { ResumeData, Education, Experience, Skill, Certification, Link } from "@/types";

import type { z } from "zod";

interface SectionFormProps {
  sectionType: keyof ResumeData;
  resumeData: ResumeData;
  updateResumeData: (type: keyof ResumeData, data: any) => void;
}

const SectionForm = ({ sectionType, resumeData, updateResumeData }: SectionFormProps) => {
  switch (sectionType) {
    case "personalInfo":
      return <PersonalInfoForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "objective":
      return <ObjectiveForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "education":
      return <EducationForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "experience":
      return <ExperienceForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "skills":
      return <SkillsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "certifications":
      return <CertificationsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "links":
      return <LinksForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    default:
      return <div>Tipo de seção não suportado</div>;
  }
};

// Formulário de Informações Pessoais
const PersonalInfoForm = ({ resumeData, updateResumeData }: SectionFormProps) => {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: resumeData.personalInfo,
  });

  const onSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    updateResumeData("personalInfo", data);
  };

  // Atualiza os dados ao digitar
  const handleChange = () => {
    const values = form.getValues();
    updateResumeData("personalInfo", values);
  };

  return (
    <Form {...form}>
      <form onChange={handleChange} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo*</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo Desejado*</FormLabel>
              <FormControl>
                <Input placeholder="Desenvolvedor Frontend, Designer UX, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localização</FormLabel>
              <FormControl>
                <Input placeholder="São Paulo, SP - Brasil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

// Formulário de Objetivo Profissional
const ObjectiveForm = ({ resumeData, updateResumeData }: SectionFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateResumeData("objective", e.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="objective" className="text-sm font-medium">
          Objetivo Profissional*
        </label>
        <Textarea
          id="objective"
          placeholder="Descreva brevemente seus objetivos profissionais"
          value={resumeData.objective}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
    </div>
  );
};

// Formulário de Formação Acadêmica
const EducationForm = ({ resumeData, updateResumeData }: SectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const addEducation = () => {
    const newId = uuidv4();
    const newEducation: Education = {
      id: newId,
      institution: "",
      degree: "",
      startDate: "",
      current: false,
    };
    updateResumeData("education", [...resumeData.education, newEducation]);
    setOpenItems([...openItems, newId]);
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    updateResumeData("education", updatedEducation);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    updateResumeData("education", updatedEducation);
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {resumeData.education.map((education, index) => (
          <AccordionItem key={education.id} value={education.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {education.institution || education.degree 
                  ? `${education.degree} - ${education.institution}`
                  : `Formação ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEducation(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Curso*</label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Bacharelado em Ciência da Computação"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Instituição*</label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="Nome da universidade/escola"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de início*</label>
                    <Input
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de conclusão</label>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={education.current}
                          onCheckedChange={(checked) => updateEducation(index, "current", checked)}
                        />
                        <span className="text-xs">Em andamento</span>
                      </div>
                    </div>
                    <Input
                      type="month"
                      value={education.endDate || ""}
                      onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                      disabled={education.current}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={education.description || ""}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    placeholder="Descrição adicional, notas ou conquistas"
                    className="mt-1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addEducation}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Formação
      </Button>
    </div>
  );
};

// Formulário de Experiência Profissional
const ExperienceForm = ({ resumeData, updateResumeData }: SectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const addExperience = () => {
    const newId = uuidv4();
    const newExperience: Experience = {
      id: newId,
      company: "",
      position: "",
      startDate: "",
      current: false,
      description: "",
    };
    updateResumeData("experience", [...resumeData.experience, newExperience]);
    setOpenItems([...openItems, newId]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    updateResumeData("experience", updatedExperience);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    updateResumeData("experience", updatedExperience);
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {resumeData.experience.map((experience, index) => (
          <AccordionItem key={experience.id} value={experience.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {experience.position || experience.company 
                  ? `${experience.position} - ${experience.company}`
                  : `Experiência ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeExperience(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Cargo*</label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    placeholder="Desenvolvedor Frontend"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Empresa*</label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Nome da empresa"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de início*</label>
                    <Input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de término</label>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={experience.current}
                          onCheckedChange={(checked) => updateExperience(index, "current", checked)}
                        />
                        <span className="text-xs">Atual</span>
                      </div>
                    </div>
                    <Input
                      type="month"
                      value={experience.endDate || ""}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      disabled={experience.current}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição*</label>
                  <Textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Descreva suas responsabilidades e conquistas"
                    className="mt-1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addExperience}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Experiência
      </Button>
    </div>
  );
};

// Formulário de Habilidades
const SkillsForm = ({ resumeData, updateResumeData }: SectionFormProps) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      name: "",
    };
    updateResumeData("skills", [...resumeData.skills, newSkill]);
  };

  const updateSkill = (index: number, field: keyof Skill, value: any) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    updateResumeData("skills", updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    updateResumeData("skills", updatedSkills);
  };

  return (
    <div className="space-y-4">
      {resumeData.skills.map((skill, index) => (
        <div key={skill.id} className="flex items-center gap-2">
          <Input
            value={skill.name}
            onChange={(e) => updateSkill(index, "name", e.target.value)}
            placeholder="Nome da habilidade"
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => removeSkill(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addSkill}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Habilidade
      </Button>
    </div>
  );
};

// Formulário de Certificações
const CertificationsForm = ({ resumeData, updateResumeData }: SectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const addCertification = () => {
    const newId = uuidv4();
    const newCertification: Certification = {
      id: newId,
      name: "",
      issuer: "",
      date: "",
    };
    updateResumeData("certifications", [...resumeData.certifications, newCertification]);
    setOpenItems([...openItems, newId]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: any) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    updateResumeData("certifications", updatedCertifications);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications.splice(index, 1);
    updateResumeData("certifications", updatedCertifications);
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {resumeData.certifications.map((certification, index) => (
          <AccordionItem key={certification.id} value={certification.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {certification.name || certification.issuer 
                  ? `${certification.name} - ${certification.issuer}`
                  : `Certificação ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCertification(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome da Certificação*</label>
                  <Input
                    value={certification.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                    placeholder="AWS Certified Developer"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Emissor*</label>
                  <Input
                    value={certification.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    placeholder="Amazon Web Services"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Data*</label>
                  <Input
                    type="month"
                    value={certification.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={certification.description || ""}
                    onChange={(e) => updateCertification(index, "description", e.target.value)}
                    placeholder="Detalhes adicionais sobre a certificação"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">URL (opcional)</label>
                  <Input
                    value={certification.url || ""}
                    onChange={(e) => updateCertification(index, "url", e.target.value)}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addCertification}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Certificação
      </Button>
    </div>
  );
};

// Formulário de Links
const LinksForm = ({ resumeData, updateResumeData }: SectionFormProps) => {
  const addLink = () => {
    const newLink: Link = {
      id: uuidv4(),
      name: "",
      url: "",
    };
    updateResumeData("links", [...resumeData.links, newLink]);
  };

  const updateLink = (index: number, field: keyof Link, value: any) => {
    const updatedLinks = [...resumeData.links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    updateResumeData("links", updatedLinks);
  };

  const removeLink = (index: number) => {
    const updatedLinks = [...resumeData.links];
    updatedLinks.splice(index, 1);
    updateResumeData("links", updatedLinks);
  };

  return (
    <div className="space-y-4">
      {resumeData.links.map((link, index) => (
        <div key={link.id} className="grid grid-cols-[1fr_2fr_auto] gap-2">
          <Input
            value={link.name}
            onChange={(e) => updateLink(index, "name", e.target.value)}
            placeholder="LinkedIn"
            className="flex-1"
          />
          <Input
            value={link.url}
            onChange={(e) => updateLink(index, "url", e.target.value)}
            placeholder="https://linkedin.com/in/seu-perfil"
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => removeLink(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addLink}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Link
      </Button>
    </div>
  );
};

export default SectionForm;
